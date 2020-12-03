package com.mogen.bundle.web.rest;

import com.mogen.bundle.domain.PkgImages;
import com.mogen.bundle.repository.PkgImagesRepository;
import com.mogen.bundle.repository.search.PkgImagesSearchRepository;
import com.mogen.bundle.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mogen.bundle.domain.PkgImages}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PkgImagesResource {

    private final Logger log = LoggerFactory.getLogger(PkgImagesResource.class);

    private static final String ENTITY_NAME = "pkgImages";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PkgImagesRepository pkgImagesRepository;

    private final PkgImagesSearchRepository pkgImagesSearchRepository;

    public PkgImagesResource(PkgImagesRepository pkgImagesRepository, PkgImagesSearchRepository pkgImagesSearchRepository) {
        this.pkgImagesRepository = pkgImagesRepository;
        this.pkgImagesSearchRepository = pkgImagesSearchRepository;
    }

    /**
     * {@code POST  /pkg-images} : Create a new pkgImages.
     *
     * @param pkgImages the pkgImages to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pkgImages, or with status {@code 400 (Bad Request)} if the pkgImages has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pkg-images")
    public ResponseEntity<PkgImages> createPkgImages(@Valid @RequestBody PkgImages pkgImages) throws URISyntaxException {
        log.debug("REST request to save PkgImages : {}", pkgImages);
        if (pkgImages.getId() != null) {
            throw new BadRequestAlertException("A new pkgImages cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PkgImages result = pkgImagesRepository.save(pkgImages);
        pkgImagesSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/pkg-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pkg-images} : Updates an existing pkgImages.
     *
     * @param pkgImages the pkgImages to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pkgImages,
     * or with status {@code 400 (Bad Request)} if the pkgImages is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pkgImages couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pkg-images")
    public ResponseEntity<PkgImages> updatePkgImages(@Valid @RequestBody PkgImages pkgImages) throws URISyntaxException {
        log.debug("REST request to update PkgImages : {}", pkgImages);
        if (pkgImages.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PkgImages result = pkgImagesRepository.save(pkgImages);
        pkgImagesSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pkgImages.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pkg-images} : get all the pkgImages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pkgImages in body.
     */
    @GetMapping("/pkg-images")
    public List<PkgImages> getAllPkgImages() {
        log.debug("REST request to get all PkgImages");
        return pkgImagesRepository.findAll();
    }

    /**
     * {@code GET  /pkg-images/:id} : get the "id" pkgImages.
     *
     * @param id the id of the pkgImages to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pkgImages, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pkg-images/{id}")
    public ResponseEntity<PkgImages> getPkgImages(@PathVariable Long id) {
        log.debug("REST request to get PkgImages : {}", id);
        Optional<PkgImages> pkgImages = pkgImagesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pkgImages);
    }

    /**
     * {@code DELETE  /pkg-images/:id} : delete the "id" pkgImages.
     *
     * @param id the id of the pkgImages to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pkg-images/{id}")
    public ResponseEntity<Void> deletePkgImages(@PathVariable Long id) {
        log.debug("REST request to delete PkgImages : {}", id);
        pkgImagesRepository.deleteById(id);
        pkgImagesSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/pkg-images?query=:query} : search for the pkgImages corresponding
     * to the query.
     *
     * @param query the query of the pkgImages search.
     * @return the result of the search.
     */
    @GetMapping("/_search/pkg-images")
    public List<PkgImages> searchPkgImages(@RequestParam String query) {
        log.debug("REST request to search PkgImages for query {}", query);
        return StreamSupport
            .stream(pkgImagesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
