package com.mogen.bundle.web.rest;

import com.mogen.bundle.domain.UserProduct;
import com.mogen.bundle.repository.UserProductRepository;
import com.mogen.bundle.repository.search.UserProductSearchRepository;
import com.mogen.bundle.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpHeaders;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mogen.bundle.domain.UserProduct}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserProductResource {

    private final Logger log = LoggerFactory.getLogger(UserProductResource.class);

    private static final String ENTITY_NAME = "userProduct";
    private static final String FILE_BASE = "images/product_"; 

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserProductRepository userProductRepository;

    private final UserProductSearchRepository userProductSearchRepository;

    public UserProductResource(UserProductRepository userProductRepository, UserProductSearchRepository userProductSearchRepository) {
        this.userProductRepository = userProductRepository;
        this.userProductSearchRepository = userProductSearchRepository;
    }

    /**
     * {@code POST  /user-products} : Create a new userProduct.
     *
     * @param userProduct the userProduct to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userProduct, or with status {@code 400 (Bad Request)} if the userProduct has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-products")
    public ResponseEntity<UserProduct> createUserProduct(@Valid @RequestBody UserProduct userProduct) throws URISyntaxException {
        log.debug("REST request to save UserProduct : {}", userProduct);
        if (userProduct.getId() != null) {
            throw new BadRequestAlertException("A new userProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserProduct result = userProductRepository.save(userProduct);
        userProductSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/user-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-products} : Updates an existing userProduct.
     *
     * @param userProduct the userProduct to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userProduct,
     * or with status {@code 400 (Bad Request)} if the userProduct is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userProduct couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-products")
    public ResponseEntity<UserProduct> updateUserProduct(@Valid @RequestBody UserProduct userProduct) throws URISyntaxException {
        log.debug("REST request to update UserProduct : {}", userProduct);
        if (userProduct.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserProduct result = userProductRepository.save(userProduct);
        userProductSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userProduct.getId().toString()))
            .body(result);
    }

    /**
    @GetMapping("/user-products-image/{id}")
    public ResponseEntity<UserProduct> getUserProductImage(@PathVariable Long id) {
        log.debug(">>>> REST request to get getUserProductImage : {}", id);
        Optional<UserProduct> userProduct = userProductRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userProduct);
    }
    
    @PutMapping("/user-products-image")
    public ResponseEntity<String> updateUserProductImage(@RequestParam("fileKey") final String fileKey, @RequestParam("file") final MultipartFile file) throws URISyntaxException {
    */
    
    @PutMapping(value = "/user-products-image",
     consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateUserProductImage(@RequestPart("file") final MultipartFile file) throws URISyntaxException {    
        //log.debug(">>> REST updateUserProductImage : {}", "TEST001");
        log.debug(">>> REST updateUserProductImage FileName : {}", file.getOriginalFilename());
        log.debug(">>> REST updateUserProductImage FileName : {}", file.getName());
        String status = "";
        if (!file.isEmpty()) {
            try {
                String savedFileName = FILE_BASE + file.getOriginalFilename();
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
        log.debug("File successfully uploaded!!!");
        return ResponseEntity.ok()
                        .body(status); 
    }
    
    @GetMapping("user-products-image-download/{id}")
    public ResponseEntity<Resource> downloadUserProductImage(@PathVariable Long id)  throws URISyntaxException {    
        Optional<UserProduct> userProduct = userProductRepository.findById(id);
        log.debug("Retrieved userProduct: " + userProduct.toString());
        String fileName = userProduct.get().getImageUrl();
        Path path = Paths.get(FILE_BASE + fileName);
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("img/jpg"))
                .header("Content-Disposition", "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    /**
     * {@code GET  /user-products} : get all the userProducts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userProducts in body.
     */
    @GetMapping("/user-products")
    public List<UserProduct> getAllUserProducts() {
        log.debug("REST request to get all UserProducts");
        return userProductRepository.findAll();
    }

    /**
     * {@code GET  /user-products/:id} : get the "id" userProduct.
     *
     * @param id the id of the userProduct to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProduct, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-products/{id}")
    public ResponseEntity<UserProduct> getUserProduct(@PathVariable Long id) {
        log.debug("REST request to get UserProduct : {}", id);
        Optional<UserProduct> userProduct = userProductRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userProduct);
    }

    /**
     * {@code DELETE  /user-products/:id} : delete the "id" userProduct.
     *
     * @param id the id of the userProduct to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-products/{id}")
    public ResponseEntity<Void> deleteUserProduct(@PathVariable Long id) {
        log.debug("REST request to delete UserProduct : {}", id);
        userProductRepository.deleteById(id);
        userProductSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/user-products?query=:query} : search for the userProduct corresponding
     * to the query.
     *
     * @param query the query of the userProduct search.
     * @return the result of the search.
     */
    @GetMapping("/_search/user-products")
    public List<UserProduct> searchUserProducts(@RequestParam String query) {
        log.debug("REST request to search UserProducts for query {}", query);
        return StreamSupport
            .stream(userProductSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
