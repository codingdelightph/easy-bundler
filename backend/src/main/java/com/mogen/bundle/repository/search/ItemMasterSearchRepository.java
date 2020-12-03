package com.mogen.bundle.repository.search;

import com.mogen.bundle.domain.ItemMaster;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link ItemMaster} entity.
 */
public interface ItemMasterSearchRepository extends ElasticsearchRepository<ItemMaster, Long> {
}
