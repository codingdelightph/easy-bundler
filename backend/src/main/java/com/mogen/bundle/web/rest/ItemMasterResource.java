package com.mogen.bundle.web.rest;

import com.mogen.bundle.domain.ItemMaster;
import com.mogen.bundle.repository.ItemMasterRepository;
import com.mogen.bundle.repository.search.ItemMasterSearchRepository;
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
 * REST controller for managing {@link com.mogen.bundle.domain.ItemMaster}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemMasterResource {

    private final Logger log = LoggerFactory.getLogger(ItemMasterResource.class);

    private static final String ENTITY_NAME = "itemMaster";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemMasterRepository itemMasterRepository;

    private final ItemMasterSearchRepository itemMasterSearchRepository;

    public ItemMasterResource(ItemMasterRepository itemMasterRepository, ItemMasterSearchRepository itemMasterSearchRepository) {
        this.itemMasterRepository = itemMasterRepository;
        this.itemMasterSearchRepository = itemMasterSearchRepository;
    }

    /**
     * {@code POST  /item-masters} : Create a new itemMaster.
     *
     * @param itemMaster the itemMaster to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemMaster, or with status {@code 400 (Bad Request)} if the itemMaster has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-masters")
    public ResponseEntity<ItemMaster> createItemMaster(@Valid @RequestBody ItemMaster itemMaster) throws URISyntaxException {
        log.debug("REST request to save ItemMaster : {}", itemMaster);
        if (itemMaster.getId() != null) {
            throw new BadRequestAlertException("A new itemMaster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemMaster result = itemMasterRepository.save(itemMaster);
        itemMasterSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/item-masters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-masters} : Updates an existing itemMaster.
     *
     * @param itemMaster the itemMaster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemMaster,
     * or with status {@code 400 (Bad Request)} if the itemMaster is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemMaster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-masters")
    public ResponseEntity<ItemMaster> updateItemMaster(@Valid @RequestBody ItemMaster itemMaster) throws URISyntaxException {
        log.debug("REST request to update ItemMaster : {}", itemMaster);
        if (itemMaster.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemMaster result = itemMasterRepository.save(itemMaster);
        itemMasterSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemMaster.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-masters} : get all the itemMasters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemMasters in body.
     */
    @GetMapping("/item-masters")
    public List<ItemMaster> getAllItemMasters() {
        log.debug("REST request to get all ItemMasters");
        return itemMasterRepository.findAll();
    }

    /**
     * {@code GET  /item-masters/:id} : get the "id" itemMaster.
     *
     * @param id the id of the itemMaster to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemMaster, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-masters/{id}")
    public ResponseEntity<ItemMaster> getItemMaster(@PathVariable Long id) {
        log.debug("REST request to get ItemMaster : {}", id);
        Optional<ItemMaster> itemMaster = itemMasterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemMaster);
    }

    /**
     * {@code DELETE  /item-masters/:id} : delete the "id" itemMaster.
     *
     * @param id the id of the itemMaster to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-masters/{id}")
    public ResponseEntity<Void> deleteItemMaster(@PathVariable Long id) {
        log.debug("REST request to delete ItemMaster : {}", id);
        itemMasterRepository.deleteById(id);
        itemMasterSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/item-masters?query=:query} : search for the itemMaster corresponding
     * to the query.
     *
     * @param query the query of the itemMaster search.
     * @return the result of the search.
     */
    @GetMapping("/_search/item-masters")
    public List<ItemMaster> searchItemMasters(@RequestParam String query) {
        log.debug("REST request to search ItemMasters for query {}", query);
        return StreamSupport
            .stream(itemMasterSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
