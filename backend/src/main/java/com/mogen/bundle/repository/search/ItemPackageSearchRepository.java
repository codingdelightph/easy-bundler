package com.mogen.bundle.repository.search;

import com.mogen.bundle.domain.ItemPackage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link ItemPackage} entity.
 */
public interface ItemPackageSearchRepository extends ElasticsearchRepository<ItemPackage, Long> {
}
