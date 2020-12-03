package com.mogen.bundle.web.rest;

import com.mogen.bundle.BundlerProApp;
import com.mogen.bundle.config.TestSecurityConfiguration;
import com.mogen.bundle.domain.ItemPackageDetails;
import com.mogen.bundle.repository.ItemPackageDetailsRepository;
import com.mogen.bundle.repository.search.ItemPackageDetailsSearchRepository;

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
 * Integration tests for the {@link ItemPackageDetailsResource} REST controller.
 */
@SpringBootTest(classes = { BundlerProApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ItemPackageDetailsResourceIT {

    private static final Integer DEFAULT_PACKAGE_ID = 1;
    private static final Integer UPDATED_PACKAGE_ID = 2;

    private static final Integer DEFAULT_ROW_ID = 1;
    private static final Integer UPDATED_ROW_ID = 2;

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ItemPackageDetailsRepository itemPackageDetailsRepository;

    /**
     * This repository is mocked in the com.mogen.bundle.repository.search test package.
     *
     * @see com.mogen.bundle.repository.search.ItemPackageDetailsSearchRepositoryMockConfiguration
     */
    @Autowired
    private ItemPackageDetailsSearchRepository mockItemPackageDetailsSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restItemPackageDetailsMockMvc;

    private ItemPackageDetails itemPackageDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPackageDetails createEntity(EntityManager em) {
        ItemPackageDetails itemPackageDetails = new ItemPackageDetails()
            .packageID(DEFAULT_PACKAGE_ID)
            .rowID(DEFAULT_ROW_ID)
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return itemPackageDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPackageDetails createUpdatedEntity(EntityManager em) {
        ItemPackageDetails itemPackageDetails = new ItemPackageDetails()
            .packageID(UPDATED_PACKAGE_ID)
            .rowID(UPDATED_ROW_ID)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);
        return itemPackageDetails;
    }

    @BeforeEach
    public void initTest() {
        itemPackageDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemPackageDetails() throws Exception {
        int databaseSizeBeforeCreate = itemPackageDetailsRepository.findAll().size();
        // Create the ItemPackageDetails
        restItemPackageDetailsMockMvc.perform(post("/api/item-package-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPackageDetails)))
            .andExpect(status().isCreated());

        // Validate the ItemPackageDetails in the database
        List<ItemPackageDetails> itemPackageDetailsList = itemPackageDetailsRepository.findAll();
        assertThat(itemPackageDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        ItemPackageDetails testItemPackageDetails = itemPackageDetailsList.get(itemPackageDetailsList.size() - 1);
        assertThat(testItemPackageDetails.getPackageID()).isEqualTo(DEFAULT_PACKAGE_ID);
        assertThat(testItemPackageDetails.getRowID()).isEqualTo(DEFAULT_ROW_ID);
        assertThat(testItemPackageDetails.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testItemPackageDetails.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the ItemPackageDetails in Elasticsearch
        verify(mockItemPackageDetailsSearchRepository, times(1)).save(testItemPackageDetails);
    }

    @Test
    @Transactional
    public void createItemPackageDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemPackageDetailsRepository.findAll().size();

        // Create the ItemPackageDetails with an existing ID
        itemPackageDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPackageDetailsMockMvc.perform(post("/api/item-package-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPackageDetails)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPackageDetails in the database
        List<ItemPackageDetails> itemPackageDetailsList = itemPackageDetailsRepository.findAll();
        assertThat(itemPackageDetailsList).hasSize(databaseSizeBeforeCreate);

        // Validate the ItemPackageDetails in Elasticsearch
        verify(mockItemPackageDetailsSearchRepository, times(0)).save(itemPackageDetails);
    }


    @Test
    @Transactional
    public void getAllItemPackageDetails() throws Exception {
        // Initialize the database
        itemPackageDetailsRepository.saveAndFlush(itemPackageDetails);

        // Get all the itemPackageDetailsList
        restItemPackageDetailsMockMvc.perform(get("/api/item-package-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPackageDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].packageID").value(hasItem(DEFAULT_PACKAGE_ID)))
            .andExpect(jsonPath("$.[*].rowID").value(hasItem(DEFAULT_ROW_ID)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getItemPackageDetails() throws Exception {
        // Initialize the database
        itemPackageDetailsRepository.saveAndFlush(itemPackageDetails);

        // Get the itemPackageDetails
        restItemPackageDetailsMockMvc.perform(get("/api/item-package-details/{id}", itemPackageDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemPackageDetails.getId().intValue()))
            .andExpect(jsonPath("$.packageID").value(DEFAULT_PACKAGE_ID))
            .andExpect(jsonPath("$.rowID").value(DEFAULT_ROW_ID))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingItemPackageDetails() throws Exception {
        // Get the itemPackageDetails
        restItemPackageDetailsMockMvc.perform(get("/api/item-package-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemPackageDetails() throws Exception {
        // Initialize the database
        itemPackageDetailsRepository.saveAndFlush(itemPackageDetails);

        int databaseSizeBeforeUpdate = itemPackageDetailsRepository.findAll().size();

        // Update the itemPackageDetails
        ItemPackageDetails updatedItemPackageDetails = itemPackageDetailsRepository.findById(itemPackageDetails.getId()).get();
        // Disconnect from session so that the updates on updatedItemPackageDetails are not directly saved in db
        em.detach(updatedItemPackageDetails);
        updatedItemPackageDetails
            .packageID(UPDATED_PACKAGE_ID)
            .rowID(UPDATED_ROW_ID)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);

        restItemPackageDetailsMockMvc.perform(put("/api/item-package-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemPackageDetails)))
            .andExpect(status().isOk());

        // Validate the ItemPackageDetails in the database
        List<ItemPackageDetails> itemPackageDetailsList = itemPackageDetailsRepository.findAll();
        assertThat(itemPackageDetailsList).hasSize(databaseSizeBeforeUpdate);
        ItemPackageDetails testItemPackageDetails = itemPackageDetailsList.get(itemPackageDetailsList.size() - 1);
        assertThat(testItemPackageDetails.getPackageID()).isEqualTo(UPDATED_PACKAGE_ID);
        assertThat(testItemPackageDetails.getRowID()).isEqualTo(UPDATED_ROW_ID);
        assertThat(testItemPackageDetails.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testItemPackageDetails.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the ItemPackageDetails in Elasticsearch
        verify(mockItemPackageDetailsSearchRepository, times(1)).save(testItemPackageDetails);
    }

    @Test
    @Transactional
    public void updateNonExistingItemPackageDetails() throws Exception {
        int databaseSizeBeforeUpdate = itemPackageDetailsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPackageDetailsMockMvc.perform(put("/api/item-package-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemPackageDetails)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPackageDetails in the database
        List<ItemPackageDetails> itemPackageDetailsList = itemPackageDetailsRepository.findAll();
        assertThat(itemPackageDetailsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ItemPackageDetails in Elasticsearch
        verify(mockItemPackageDetailsSearchRepository, times(0)).save(itemPackageDetails);
    }

    @Test
    @Transactional
    public void deleteItemPackageDetails() throws Exception {
        // Initialize the database
        itemPackageDetailsRepository.saveAndFlush(itemPackageDetails);

        int databaseSizeBeforeDelete = itemPackageDetailsRepository.findAll().size();

        // Delete the itemPackageDetails
        restItemPackageDetailsMockMvc.perform(delete("/api/item-package-details/{id}", itemPackageDetails.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemPackageDetails> itemPackageDetailsList = itemPackageDetailsRepository.findAll();
        assertThat(itemPackageDetailsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ItemPackageDetails in Elasticsearch
        verify(mockItemPackageDetailsSearchRepository, times(1)).deleteById(itemPackageDetails.getId());
    }

    @Test
    @Transactional
    public void searchItemPackageDetails() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        itemPackageDetailsRepository.saveAndFlush(itemPackageDetails);
        when(mockItemPackageDetailsSearchRepository.search(queryStringQuery("id:" + itemPackageDetails.getId())))
            .thenReturn(Collections.singletonList(itemPackageDetails));

        // Search the itemPackageDetails
        restItemPackageDetailsMockMvc.perform(get("/api/_search/item-package-details?query=id:" + itemPackageDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPackageDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].packageID").value(hasItem(DEFAULT_PACKAGE_ID)))
            .andExpect(jsonPath("$.[*].rowID").value(hasItem(DEFAULT_ROW_ID)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
}
