package com.mogen.bundle.web.rest;

import com.mogen.bundle.domain.ItemPackageDetails;
import com.mogen.bundle.repository.ItemPackageDetailsRepository;
import com.mogen.bundle.repository.search.ItemPackageDetailsSearchRepository;
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
 * REST controller for managing {@link com.mogen.bundle.domain.ItemPackageDetails}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemPackageDetailsResource {

    private final Logger log = LoggerFactory.getLogger(ItemPackageDetailsResource.class);

    private static final String ENTITY_NAME = "itemPackageDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemPackageDetailsRepository itemPackageDetailsRepository;

    private final ItemPackageDetailsSearchRepository itemPackageDetailsSearchRepository;

    public ItemPackageDetailsResource(ItemPackageDetailsRepository itemPackageDetailsRepository, ItemPackageDetailsSearchRepository itemPackageDetailsSearchRepository) {
        this.itemPackageDetailsRepository = itemPackageDetailsRepository;
        this.itemPackageDetailsSearchRepository = itemPackageDetailsSearchRepository;
    }

    /**
     * {@code POST  /item-package-details} : Create a new itemPackageDetails.
     *
     * @param itemPackageDetails the itemPackageDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemPackageDetails, or with status {@code 400 (Bad Request)} if the itemPackageDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-package-details")
    public ResponseEntity<ItemPackageDetails> createItemPackageDetails(@Valid @RequestBody ItemPackageDetails itemPackageDetails) throws URISyntaxException {
        log.debug("REST request to save ItemPackageDetails : {}", itemPackageDetails);
        if (itemPackageDetails.getId() != null) {
            throw new BadRequestAlertException("A new itemPackageDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemPackageDetails result = itemPackageDetailsRepository.save(itemPackageDetails);
        itemPackageDetailsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/item-package-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-package-details} : Updates an existing itemPackageDetails.
     *
     * @param itemPackageDetails the itemPackageDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemPackageDetails,
     * or with status {@code 400 (Bad Request)} if the itemPackageDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemPackageDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-package-details")
    public ResponseEntity<ItemPackageDetails> updateItemPackageDetails(@Valid @RequestBody ItemPackageDetails itemPackageDetails) throws URISyntaxException {
        log.debug("REST request to update ItemPackageDetails : {}", itemPackageDetails);
        if (itemPackageDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemPackageDetails result = itemPackageDetailsRepository.save(itemPackageDetails);
        itemPackageDetailsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemPackageDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-package-details} : get all the itemPackageDetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemPackageDetails in body.
     */
    @GetMapping("/item-package-details")
    public List<ItemPackageDetails> getAllItemPackageDetails() {
        log.debug("REST request to get all ItemPackageDetails");
        return itemPackageDetailsRepository.findAll();
    }

    /**
     * {@code GET  /item-package-details/:id} : get the "id" itemPackageDetails.
     *
     * @param id the id of the itemPackageDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemPackageDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-package-details/{id}")
    public ResponseEntity<ItemPackageDetails> getItemPackageDetails(@PathVariable Long id) {
        log.debug("REST request to get ItemPackageDetails : {}", id);
        Optional<ItemPackageDetails> itemPackageDetails = itemPackageDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemPackageDetails);
    }

    /**
     * {@code DELETE  /item-package-details/:id} : delete the "id" itemPackageDetails.
     *
     * @param id the id of the itemPackageDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-package-details/{id}")
    public ResponseEntity<Void> deleteItemPackageDetails(@PathVariable Long id) {
        log.debug("REST request to delete ItemPackageDetails : {}", id);
        itemPackageDetailsRepository.deleteById(id);
        itemPackageDetailsSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/item-package-details?query=:query} : search for the itemPackageDetails corresponding
     * to the query.
     *
     * @param query the query of the itemPackageDetails search.
     * @return the result of the search.
     */
    @GetMapping("/_search/item-package-details")
    public List<ItemPackageDetails> searchItemPackageDetails(@RequestParam String query) {
        log.debug("REST request to search ItemPackageDetails for query {}", query);
        return StreamSupport
            .stream(itemPackageDetailsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
