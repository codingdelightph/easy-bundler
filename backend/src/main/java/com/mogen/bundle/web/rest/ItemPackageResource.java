package com.mogen.bundle.web.rest;

import com.mogen.bundle.domain.ItemPackage;
import com.mogen.bundle.repository.ItemPackageRepository;
import com.mogen.bundle.repository.search.ItemPackageSearchRepository;
import com.mogen.bundle.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mogen.bundle.domain.ItemPackage}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemPackageResource {

    private final Logger log = LoggerFactory.getLogger(ItemPackageResource.class);

    private static final String ENTITY_NAME = "itemPackage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemPackageRepository itemPackageRepository;

    private final ItemPackageSearchRepository itemPackageSearchRepository;

    public ItemPackageResource(ItemPackageRepository itemPackageRepository, ItemPackageSearchRepository itemPackageSearchRepository) {
        this.itemPackageRepository = itemPackageRepository;
        this.itemPackageSearchRepository = itemPackageSearchRepository;
    }

    /**
     * {@code POST  /item-packages} : Create a new itemPackage.
     *
     * @param itemPackage the itemPackage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemPackage, or with status {@code 400 (Bad Request)} if the itemPackage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-packages")
    public ResponseEntity<ItemPackage> createItemPackage(@Valid @RequestBody ItemPackage itemPackage) throws URISyntaxException {
        log.debug("REST request to save ItemPackage : {}", itemPackage);
        if (itemPackage.getId() != null) {
            throw new BadRequestAlertException("A new itemPackage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemPackage result = itemPackageRepository.save(itemPackage);
        itemPackageSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/item-packages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-packages} : Updates an existing itemPackage.
     *
     * @param itemPackage the itemPackage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemPackage,
     * or with status {@code 400 (Bad Request)} if the itemPackage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemPackage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-packages")
    public ResponseEntity<ItemPackage> updateItemPackage(@Valid @RequestBody ItemPackage itemPackage) throws URISyntaxException {
        log.debug("REST request to update ItemPackage : {}", itemPackage);
        if (itemPackage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemPackage result = itemPackageRepository.save(itemPackage);
        itemPackageSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemPackage.getId().toString()))
            .body(result);
    }

    @PutMapping("/item-packages-image")
    public ResponseEntity<String> updateItemPackageImage(@RequestParam("fileKey") final String fileKey, @RequestParam("file") final MultipartFile file) throws URISyntaxException {
        log.debug(">>> REST updateItemPackageImage : {}", fileKey);
        String status = "";
        if (!file.isEmpty()) {
            try {
                String savedFileName = "images/product_" + fileKey;
                final File fileServer = new File(savedFileName);
                fileServer.createNewFile();
                final byte[] bytes = file.getBytes();
                final BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(fileServer));
                stream.write(bytes);
                stream.close();     
                status = "File successfully uploaded";          
            } catch (final Exception e) {
                status = e.getMessage();
            }
        } else {
            status = "You failed to upload because the file was empty.";
        }
        return ResponseEntity.ok()
                        .body(status);   
    }

    /**
     * {@code GET  /item-packages} : get all the itemPackages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemPackages in body.
     */
    @GetMapping("/item-packages")
    public List<ItemPackage> getAllItemPackages() {
        log.debug("REST request to get all ItemPackages");
        return itemPackageRepository.findAll();
    }

    /**
     * {@code GET  /item-packages/:id} : get the "id" itemPackage.
     *
     * @param id the id of the itemPackage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemPackage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-packages/{id}")
    public ResponseEntity<ItemPackage> getItemPackage(@PathVariable Long id) {
        log.debug("REST request to get ItemPackage : {}", id);
        Optional<ItemPackage> itemPackage = itemPackageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemPackage);
    }

    /**
     * {@code DELETE  /item-packages/:id} : delete the "id" itemPackage.
     *
     * @param id the id of the itemPackage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-packages/{id}")
    public ResponseEntity<Void> deleteItemPackage(@PathVariable Long id) {
        log.debug("REST request to delete ItemPackage : {}", id);
        itemPackageRepository.deleteById(id);
        itemPackageSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/item-packages?query=:query} : search for the itemPackage corresponding
     * to the query.
     *
     * @param query the query of the itemPackage search.
     * @return the result of the search.
     */
    @GetMapping("/_search/item-packages")
    public List<ItemPackage> searchItemPackages(@RequestParam String query) {
        log.debug("REST request to search ItemPackages for query {}", query);
        return StreamSupport
            .stream(itemPackageSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
