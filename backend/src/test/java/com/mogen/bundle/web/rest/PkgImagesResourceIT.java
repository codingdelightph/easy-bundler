package com.mogen.bundle.web.rest;

import com.mogen.bundle.BundlerProApp;
import com.mogen.bundle.config.TestSecurityConfiguration;
import com.mogen.bundle.domain.PkgImages;
import com.mogen.bundle.repository.PkgImagesRepository;
import com.mogen.bundle.repository.search.PkgImagesSearchRepository;

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
 * Integration tests for the {@link PkgImagesResource} REST controller.
 */
@SpringBootTest(classes = { BundlerProApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class PkgImagesResourceIT {

    private static final Integer DEFAULT_PACKAGE_ID = 1;
    private static final Integer UPDATED_PACKAGE_ID = 2;

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    @Autowired
    private PkgImagesRepository pkgImagesRepository;

    /**
     * This repository is mocked in the com.mogen.bundle.repository.search test package.
     *
     * @see com.mogen.bundle.repository.search.PkgImagesSearchRepositoryMockConfiguration
     */
    @Autowired
    private PkgImagesSearchRepository mockPkgImagesSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPkgImagesMockMvc;

    private PkgImages pkgImages;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PkgImages createEntity(EntityManager em) {
        PkgImages pkgImages = new PkgImages()
            .packageID(DEFAULT_PACKAGE_ID)
            .imageUrl(DEFAULT_IMAGE_URL);
        return pkgImages;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PkgImages createUpdatedEntity(EntityManager em) {
        PkgImages pkgImages = new PkgImages()
            .packageID(UPDATED_PACKAGE_ID)
            .imageUrl(UPDATED_IMAGE_URL);
        return pkgImages;
    }

    @BeforeEach
    public void initTest() {
        pkgImages = createEntity(em);
    }

    @Test
    @Transactional
    public void createPkgImages() throws Exception {
        int databaseSizeBeforeCreate = pkgImagesRepository.findAll().size();
        // Create the PkgImages
        restPkgImagesMockMvc.perform(post("/api/pkg-images").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pkgImages)))
            .andExpect(status().isCreated());

        // Validate the PkgImages in the database
        List<PkgImages> pkgImagesList = pkgImagesRepository.findAll();
        assertThat(pkgImagesList).hasSize(databaseSizeBeforeCreate + 1);
        PkgImages testPkgImages = pkgImagesList.get(pkgImagesList.size() - 1);
        assertThat(testPkgImages.getPackageID()).isEqualTo(DEFAULT_PACKAGE_ID);
        assertThat(testPkgImages.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);

        // Validate the PkgImages in Elasticsearch
        verify(mockPkgImagesSearchRepository, times(1)).save(testPkgImages);
    }

    @Test
    @Transactional
    public void createPkgImagesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pkgImagesRepository.findAll().size();

        // Create the PkgImages with an existing ID
        pkgImages.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPkgImagesMockMvc.perform(post("/api/pkg-images").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pkgImages)))
            .andExpect(status().isBadRequest());

        // Validate the PkgImages in the database
        List<PkgImages> pkgImagesList = pkgImagesRepository.findAll();
        assertThat(pkgImagesList).hasSize(databaseSizeBeforeCreate);

        // Validate the PkgImages in Elasticsearch
        verify(mockPkgImagesSearchRepository, times(0)).save(pkgImages);
    }


    @Test
    @Transactional
    public void getAllPkgImages() throws Exception {
        // Initialize the database
        pkgImagesRepository.saveAndFlush(pkgImages);

        // Get all the pkgImagesList
        restPkgImagesMockMvc.perform(get("/api/pkg-images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pkgImages.getId().intValue())))
            .andExpect(jsonPath("$.[*].packageID").value(hasItem(DEFAULT_PACKAGE_ID)))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)));
    }
    
    @Test
    @Transactional
    public void getPkgImages() throws Exception {
        // Initialize the database
        pkgImagesRepository.saveAndFlush(pkgImages);

        // Get the pkgImages
        restPkgImagesMockMvc.perform(get("/api/pkg-images/{id}", pkgImages.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pkgImages.getId().intValue()))
            .andExpect(jsonPath("$.packageID").value(DEFAULT_PACKAGE_ID))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL));
    }
    @Test
    @Transactional
    public void getNonExistingPkgImages() throws Exception {
        // Get the pkgImages
        restPkgImagesMockMvc.perform(get("/api/pkg-images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePkgImages() throws Exception {
        // Initialize the database
        pkgImagesRepository.saveAndFlush(pkgImages);

        int databaseSizeBeforeUpdate = pkgImagesRepository.findAll().size();

        // Update the pkgImages
        PkgImages updatedPkgImages = pkgImagesRepository.findById(pkgImages.getId()).get();
        // Disconnect from session so that the updates on updatedPkgImages are not directly saved in db
        em.detach(updatedPkgImages);
        updatedPkgImages
            .packageID(UPDATED_PACKAGE_ID)
            .imageUrl(UPDATED_IMAGE_URL);

        restPkgImagesMockMvc.perform(put("/api/pkg-images").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPkgImages)))
            .andExpect(status().isOk());

        // Validate the PkgImages in the database
        List<PkgImages> pkgImagesList = pkgImagesRepository.findAll();
        assertThat(pkgImagesList).hasSize(databaseSizeBeforeUpdate);
        PkgImages testPkgImages = pkgImagesList.get(pkgImagesList.size() - 1);
        assertThat(testPkgImages.getPackageID()).isEqualTo(UPDATED_PACKAGE_ID);
        assertThat(testPkgImages.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);

        // Validate the PkgImages in Elasticsearch
        verify(mockPkgImagesSearchRepository, times(1)).save(testPkgImages);
    }

    @Test
    @Transactional
    public void updateNonExistingPkgImages() throws Exception {
        int databaseSizeBeforeUpdate = pkgImagesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPkgImagesMockMvc.perform(put("/api/pkg-images").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pkgImages)))
            .andExpect(status().isBadRequest());

        // Validate the PkgImages in the database
        List<PkgImages> pkgImagesList = pkgImagesRepository.findAll();
        assertThat(pkgImagesList).hasSize(databaseSizeBeforeUpdate);

        // Validate the PkgImages in Elasticsearch
        verify(mockPkgImagesSearchRepository, times(0)).save(pkgImages);
    }

    @Test
    @Transactional
    public void deletePkgImages() throws Exception {
        // Initialize the database
        pkgImagesRepository.saveAndFlush(pkgImages);

        int databaseSizeBeforeDelete = pkgImagesRepository.findAll().size();

        // Delete the pkgImages
        restPkgImagesMockMvc.perform(delete("/api/pkg-images/{id}", pkgImages.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PkgImages> pkgImagesList = pkgImagesRepository.findAll();
        assertThat(pkgImagesList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the PkgImages in Elasticsearch
        verify(mockPkgImagesSearchRepository, times(1)).deleteById(pkgImages.getId());
    }

    @Test
    @Transactional
    public void searchPkgImages() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        pkgImagesRepository.saveAndFlush(pkgImages);
        when(mockPkgImagesSearchRepository.search(queryStringQuery("id:" + pkgImages.getId())))
            .thenReturn(Collections.singletonList(pkgImages));

        // Search the pkgImages
        restPkgImagesMockMvc.perform(get("/api/_search/pkg-images?query=id:" + pkgImages.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pkgImages.getId().intValue())))
            .andExpect(jsonPath("$.[*].packageID").value(hasItem(DEFAULT_PACKAGE_ID)))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)));
    }
}
