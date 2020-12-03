package com.mogen.bundle.web.rest;

import com.mogen.bundle.BundlerProApp;
import com.mogen.bundle.config.TestSecurityConfiguration;
import com.mogen.bundle.domain.ItemPackage;
import com.mogen.bundle.repository.ItemPackageRepository;
import com.mogen.bundle.repository.search.ItemPackageSearchRepository;

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
 * Integration tests for the {@link ItemPackageResource} REST controller.
 */
@SpringBootTest(classes = { BundlerProApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ItemPackageResourceIT {

    private static final Integer DEFAULT_PACKAGE_ID = 1;
    private static final Integer UPDATED_PACKAGE_ID = 2;

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ItemPackageRepository itemPackageRepository;

    /**
     * This repository is mocked in the com.mogen.bundle.repository.search test package.
     *
     * @see com.mogen.bundle.repository.search.ItemPackageSearchRepositoryMockConfiguration
     */
    @Autowired
    private ItemPackageSearchRepository mockItemPackageSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restItemPackageMockMvc;

    private ItemPackage itemPackage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPackage createEntity(EntityManager em) {
        ItemPackage itemPackage = new ItemPackage()
            .packageID(DEFAULT_PACKAGE_ID)
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return itemPackage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPackage createUpdatedEntity(EntityManager em) {
        ItemPackage itemPackage = new ItemPackage()
            .packageID(UPDATED_PACKAGE_ID)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);
        return itemPackage;
    }

    @BeforeEach
    public void initTest() {
        itemPackage = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemPackage() throws Exception {
        int databaseSizeBeforeCreate = itemPackageRepository.findAll().size();
        // Create the ItemPackage
        restItemPackageMockMvc.perform(post("/api/item-packages").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPackage)))
            .andExpect(status().isCreated());

        // Validate the ItemPackage in the database
        List<ItemPackage> itemPackageList = itemPackageRepository.findAll();
        assertThat(itemPackageList).hasSize(databaseSizeBeforeCreate + 1);
        ItemPackage testItemPackage = itemPackageList.get(itemPackageList.size() - 1);
        assertThat(testItemPackage.getPackageID()).isEqualTo(DEFAULT_PACKAGE_ID);
        assertThat(testItemPackage.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testItemPackage.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the ItemPackage in Elasticsearch
        verify(mockItemPackageSearchRepository, times(1)).save(testItemPackage);
    }

    @Test
    @Transactional
    public void createItemPackageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemPackageRepository.findAll().size();

        // Create the ItemPackage with an existing ID
        itemPackage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPackageMockMvc.perform(post("/api/item-packages").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPackage)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPackage in the database
        List<ItemPackage> itemPackageList = itemPackageRepository.findAll();
        assertThat(itemPackageList).hasSize(databaseSizeBeforeCreate);

        // Validate the ItemPackage in Elasticsearch
        verify(mockItemPackageSearchRepository, times(0)).save(itemPackage);
    }


    @Test
    @Transactional
    public void getAllItemPackages() throws Exception {
        // Initialize the database
        itemPackageRepository.saveAndFlush(itemPackage);

        // Get all the itemPackageList
        restItemPackageMockMvc.perform(get("/api/item-packages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPackage.getId().intValue())))
            .andExpect(jsonPath("$.[*].packageID").value(hasItem(DEFAULT_PACKAGE_ID)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getItemPackage() throws Exception {
        // Initialize the database
        itemPackageRepository.saveAndFlush(itemPackage);

        // Get the itemPackage
        restItemPackageMockMvc.perform(get("/api/item-packages/{id}", itemPackage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemPackage.getId().intValue()))
            .andExpect(jsonPath("$.packageID").value(DEFAULT_PACKAGE_ID))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingItemPackage() throws Exception {
        // Get the itemPackage
        restItemPackageMockMvc.perform(get("/api/item-packages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemPackage() throws Exception {
        // Initialize the database
        itemPackageRepository.saveAndFlush(itemPackage);

        int databaseSizeBeforeUpdate = itemPackageRepository.findAll().size();

        // Update the itemPackage
        ItemPackage updatedItemPackage = itemPackageRepository.findById(itemPackage.getId()).get();
        // Disconnect from session so that the updates on updatedItemPackage are not directly saved in db
        em.detach(updatedItemPackage);
        updatedItemPackage
            .packageID(UPDATED_PACKAGE_ID)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);

        restItemPackageMockMvc.perform(put("/api/item-packages").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemPackage)))
            .andExpect(status().isOk());

        // Validate the ItemPackage in the database
        List<ItemPackage> itemPackageList = itemPackageRepository.findAll();
        assertThat(itemPackageList).hasSize(databaseSizeBeforeUpdate);
        ItemPackage testItemPackage = itemPackageList.get(itemPackageList.size() - 1);
        assertThat(testItemPackage.getPackageID()).isEqualTo(UPDATED_PACKAGE_ID);
        assertThat(testItemPackage.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testItemPackage.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the ItemPackage in Elasticsearch
        verify(mockItemPackageSearchRepository, times(1)).save(testItemPackage);
    }

    @Test
    @Transactional
    public void updateNonExistingItemPackage() throws Exception {
        int databaseSizeBeforeUpdate = itemPackageRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPackageMockMvc.perform(put("/api/item-packages").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPackage)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPackage in the database
        List<ItemPackage> itemPackageList = itemPackageRepository.findAll();
        assertThat(itemPackageList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ItemPackage in Elasticsearch
        verify(mockItemPackageSearchRepository, times(0)).save(itemPackage);
    }

    @Test
    @Transactional
    public void deleteItemPackage() throws Exception {
        // Initialize the database
        itemPackageRepository.saveAndFlush(itemPackage);

        int databaseSizeBeforeDelete = itemPackageRepository.findAll().size();

        // Delete the itemPackage
        restItemPackageMockMvc.perform(delete("/api/item-packages/{id}", itemPackage.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemPackage> itemPackageList = itemPackageRepository.findAll();
        assertThat(itemPackageList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ItemPackage in Elasticsearch
        verify(mockItemPackageSearchRepository, times(1)).deleteById(itemPackage.getId());
    }

    @Test
    @Transactional
    public void searchItemPackage() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        itemPackageRepository.saveAndFlush(itemPackage);
        when(mockItemPackageSearchRepository.search(queryStringQuery("id:" + itemPackage.getId())))
            .thenReturn(Collections.singletonList(itemPackage));

        // Search the itemPackage
        restItemPackageMockMvc.perform(get("/api/_search/item-packages?query=id:" + itemPackage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPackage.getId().intValue())))
            .andExpect(jsonPath("$.[*].packageID").value(hasItem(DEFAULT_PACKAGE_ID)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
}
