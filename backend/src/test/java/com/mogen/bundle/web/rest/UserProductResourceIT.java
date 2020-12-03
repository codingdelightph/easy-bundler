package com.mogen.bundle.web.rest;

import com.mogen.bundle.BundlerProApp;
import com.mogen.bundle.config.TestSecurityConfiguration;
import com.mogen.bundle.domain.UserProduct;
import com.mogen.bundle.repository.UserProductRepository;
import com.mogen.bundle.repository.search.UserProductSearchRepository;

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
 * Integration tests for the {@link UserProductResource} REST controller.
 */
@SpringBootTest(classes = { BundlerProApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserProductResourceIT {

    private static final Integer DEFAULT_PACKAGE_ID = 1;
    private static final Integer UPDATED_PACKAGE_ID = 2;

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    @Autowired
    private UserProductRepository userProductRepository;

    /**
     * This repository is mocked in the com.mogen.bundle.repository.search test package.
     *
     * @see com.mogen.bundle.repository.search.UserProductSearchRepositoryMockConfiguration
     */
    @Autowired
    private UserProductSearchRepository mockUserProductSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserProductMockMvc;

    private UserProduct userProduct;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProduct createEntity(EntityManager em) {
        UserProduct userProduct = new UserProduct()
            .packageID(DEFAULT_PACKAGE_ID)
            .imageUrl(DEFAULT_IMAGE_URL);
        return userProduct;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProduct createUpdatedEntity(EntityManager em) {
        UserProduct userProduct = new UserProduct()
            .packageID(UPDATED_PACKAGE_ID)
            .imageUrl(UPDATED_IMAGE_URL);
        return userProduct;
    }

    @BeforeEach
    public void initTest() {
        userProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserProduct() throws Exception {
        int databaseSizeBeforeCreate = userProductRepository.findAll().size();
        // Create the UserProduct
        restUserProductMockMvc.perform(post("/api/user-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userProduct)))
            .andExpect(status().isCreated());

        // Validate the UserProduct in the database
        List<UserProduct> userProductList = userProductRepository.findAll();
        assertThat(userProductList).hasSize(databaseSizeBeforeCreate + 1);
        UserProduct testUserProduct = userProductList.get(userProductList.size() - 1);
        assertThat(testUserProduct.getPackageID()).isEqualTo(DEFAULT_PACKAGE_ID);
        assertThat(testUserProduct.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);

        // Validate the UserProduct in Elasticsearch
        verify(mockUserProductSearchRepository, times(1)).save(testUserProduct);
    }

    @Test
    @Transactional
    public void createUserProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userProductRepository.findAll().size();

        // Create the UserProduct with an existing ID
        userProduct.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserProductMockMvc.perform(post("/api/user-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userProduct)))
            .andExpect(status().isBadRequest());

        // Validate the UserProduct in the database
        List<UserProduct> userProductList = userProductRepository.findAll();
        assertThat(userProductList).hasSize(databaseSizeBeforeCreate);

        // Validate the UserProduct in Elasticsearch
        verify(mockUserProductSearchRepository, times(0)).save(userProduct);
    }


    @Test
    @Transactional
    public void getAllUserProducts() throws Exception {
        // Initialize the database
        userProductRepository.saveAndFlush(userProduct);

        // Get all the userProductList
        restUserProductMockMvc.perform(get("/api/user-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].packageID").value(hasItem(DEFAULT_PACKAGE_ID)))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)));
    }
    
    @Test
    @Transactional
    public void getUserProduct() throws Exception {
        // Initialize the database
        userProductRepository.saveAndFlush(userProduct);

        // Get the userProduct
        restUserProductMockMvc.perform(get("/api/user-products/{id}", userProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userProduct.getId().intValue()))
            .andExpect(jsonPath("$.packageID").value(DEFAULT_PACKAGE_ID))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL));
    }
    @Test
    @Transactional
    public void getNonExistingUserProduct() throws Exception {
        // Get the userProduct
        restUserProductMockMvc.perform(get("/api/user-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserProduct() throws Exception {
        // Initialize the database
        userProductRepository.saveAndFlush(userProduct);

        int databaseSizeBeforeUpdate = userProductRepository.findAll().size();

        // Update the userProduct
        UserProduct updatedUserProduct = userProductRepository.findById(userProduct.getId()).get();
        // Disconnect from session so that the updates on updatedUserProduct are not directly saved in db
        em.detach(updatedUserProduct);
        updatedUserProduct
            .packageID(UPDATED_PACKAGE_ID)
            .imageUrl(UPDATED_IMAGE_URL);

        restUserProductMockMvc.perform(put("/api/user-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserProduct)))
            .andExpect(status().isOk());

        // Validate the UserProduct in the database
        List<UserProduct> userProductList = userProductRepository.findAll();
        assertThat(userProductList).hasSize(databaseSizeBeforeUpdate);
        UserProduct testUserProduct = userProductList.get(userProductList.size() - 1);
        assertThat(testUserProduct.getPackageID()).isEqualTo(UPDATED_PACKAGE_ID);
        assertThat(testUserProduct.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);

        // Validate the UserProduct in Elasticsearch
        verify(mockUserProductSearchRepository, times(1)).save(testUserProduct);
    }

    @Test
    @Transactional
    public void updateNonExistingUserProduct() throws Exception {
        int databaseSizeBeforeUpdate = userProductRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserProductMockMvc.perform(put("/api/user-products").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userProduct)))
            .andExpect(status().isBadRequest());

        // Validate the UserProduct in the database
        List<UserProduct> userProductList = userProductRepository.findAll();
        assertThat(userProductList).hasSize(databaseSizeBeforeUpdate);

        // Validate the UserProduct in Elasticsearch
        verify(mockUserProductSearchRepository, times(0)).save(userProduct);
    }

    @Test
    @Transactional
    public void deleteUserProduct() throws Exception {
        // Initialize the database
        userProductRepository.saveAndFlush(userProduct);

        int databaseSizeBeforeDelete = userProductRepository.findAll().size();

        // Delete the userProduct
        restUserProductMockMvc.perform(delete("/api/user-products/{id}", userProduct.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserProduct> userProductList = userProductRepository.findAll();
        assertThat(userProductList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the UserProduct in Elasticsearch
        verify(mockUserProductSearchRepository, times(1)).deleteById(userProduct.getId());
    }

    @Test
    @Transactional
    public void searchUserProduct() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        userProductRepository.saveAndFlush(userProduct);
        when(mockUserProductSearchRepository.search(queryStringQuery("id:" + userProduct.getId())))
            .thenReturn(Collections.singletonList(userProduct));

        // Search the userProduct
        restUserProductMockMvc.perform(get("/api/_search/user-products?query=id:" + userProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].packageID").value(hasItem(DEFAULT_PACKAGE_ID)))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)));
    }
}
