package com.mogen.bundle.repository.search;

import com.mogen.bundle.domain.UserProduct;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link UserProduct} entity.
 */
public interface UserProductSearchRepository extends ElasticsearchRepository<UserProduct, Long> {
}
