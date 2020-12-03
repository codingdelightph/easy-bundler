package com.mogen.bundle.web.rest;

import com.mogen.bundle.BundlerProApp;
import com.mogen.bundle.config.TestSecurityConfiguration;
import com.mogen.bundle.domain.ItemMaster;
import com.mogen.bundle.repository.ItemMasterRepository;
import com.mogen.bundle.repository.search.ItemMasterSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ItemMasterResource} REST controller.
 */
@SpringBootTest(classes = { BundlerProApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ItemMasterResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ItemMasterRepository itemMasterRepository;

    /**
     * This repository is mocked in the com.mogen.bundle.repository.search test package.
     *
     * @see com.mogen.bundle.repository.search.ItemMasterSearchRepositoryMockConfiguration
     */
    @Autowired
    private ItemMasterSearchRepository mockItemMasterSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restItemMasterMockMvc;

    private ItemMaster itemMaster;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemMaster createEntity(EntityManager em) {
        ItemMaster itemMaster = new ItemMaster()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return itemMaster;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemMaster createUpdatedEntity(EntityManager em) {
        ItemMaster itemMaster = new ItemMaster()
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);
        return itemMaster;
    }

    @BeforeEach
    public void initTest() {
        itemMaster = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemMaster() throws Exception {
        int databaseSizeBeforeCreate = itemMasterRepository.findAll().size();
        // Create the ItemMaster
        restItemMasterMockMvc.perform(post("/api/item-masters").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemMaster)))
            .andExpect(status().isCreated());

        // Validate the ItemMaster in the database
        List<ItemMaster> itemMasterList = itemMasterRepository.findAll();
        assertThat(itemMasterList).hasSize(databaseSizeBeforeCreate + 1);
        ItemMaster testItemMaster = itemMasterList.get(itemMasterList.size() - 1);
        assertThat(testItemMaster.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testItemMaster.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the ItemMaster in Elasticsearch
        verify(mockItemMasterSearchRepository, times(1)).save(testItemMaster);
    }

    @Test
    @Transactional
    public void createItemMasterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemMasterRepository.findAll().size();

        // Create the ItemMaster with an existing ID
        itemMaster.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemMasterMockMvc.perform(post("/api/item-masters").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemMaster)))
            .andExpect(status().isBadRequest());

        // Validate the ItemMaster in the database
        List<ItemMaster> itemMasterList = itemMasterRepository.findAll();
        assertThat(itemMasterList).hasSize(databaseSizeBeforeCreate);

        // Validate the ItemMaster in Elasticsearch
        verify(mockItemMasterSearchRepository, times(0)).save(itemMaster);
    }


    @Test
    @Transactional
    public void getAllItemMasters() throws Exception {
        // Initialize the database
        itemMasterRepository.saveAndFlush(itemMaster);

        // Get all the itemMasterList
        restItemMasterMockMvc.perform(get("/api/item-masters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemMaster.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getItemMaster() throws Exception {
        // Initialize the database
        itemMasterRepository.saveAndFlush(itemMaster);

        // Get the itemMaster
        restItemMasterMockMvc.perform(get("/api/item-masters/{id}", itemMaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemMaster.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingItemMaster() throws Exception {
        // Get the itemMaster
        restItemMasterMockMvc.perform(get("/api/item-masters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemMaster() throws Exception {
        // Initialize the database
        itemMasterRepository.saveAndFlush(itemMaster);

        int databaseSizeBeforeUpdate = itemMasterRepository.findAll().size();

        // Update the itemMaster
        ItemMaster updatedItemMaster = itemMasterRepository.findById(itemMaster.getId()).get();
        // Disconnect from session so that the updates on updatedItemMaster are not directly saved in db
        em.detach(updatedItemMaster);
        updatedItemMaster
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);

        restItemMasterMockMvc.perform(put("/api/item-masters").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemMaster)))
            .andExpect(status().isOk());

        // Validate the ItemMaster in the database
        List<ItemMaster> itemMasterList = itemMasterRepository.findAll();
        assertThat(itemMasterList).hasSize(databaseSizeBeforeUpdate);
        ItemMaster testItemMaster = itemMasterList.get(itemMasterList.size() - 1);
        assertThat(testItemMaster.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testItemMaster.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the ItemMaster in Elasticsearch
        verify(mockItemMasterSearchRepository, times(1)).save(testItemMaster);
    }

    @Test
    @Transactional
    public void updateNonExistingItemMaster() throws Exception {
        int databaseSizeBeforeUpdate = itemMasterRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemMasterMockMvc.perform(put("/api/item-masters").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemMaster)))
            .andExpect(status().isBadRequest());

        // Validate the ItemMaster in the database
        List<ItemMaster> itemMasterList = itemMasterRepository.findAll();
        assertThat(itemMasterList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ItemMaster in Elasticsearch
        verify(mockItemMasterSearchRepository, times(0)).save(itemMaster);
    }

    @Test
    @Transactional
    public void deleteItemMaster() throws Exception {
        // Initialize the database
        itemMasterRepository.saveAndFlush(itemMaster);

        int databaseSizeBeforeDelete = itemMasterRepository.findAll().size();

        // Delete the itemMaster
        restItemMasterMockMvc.perform(delete("/api/item-masters/{id}", itemMaster.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemMaster> itemMasterList = itemMasterRepository.findAll();
        assertThat(itemMasterList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ItemMaster in Elasticsearch
        verify(mockItemMasterSearchRepository, times(1)).deleteById(itemMaster.getId());
    }

    @Test
    @Transactional
    public void searchItemMaster() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        itemMasterRepository.saveAndFlush(itemMaster);
        when(mockItemMasterSearchRepository.search(queryStringQuery("id:" + itemMaster.getId())))
            .thenReturn(Collections.singletonList(itemMaster));

        // Search the itemMaster
        restItemMasterMockMvc.perform(get("/api/_search/item-masters?query=id:" + itemMaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemMaster.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
}
