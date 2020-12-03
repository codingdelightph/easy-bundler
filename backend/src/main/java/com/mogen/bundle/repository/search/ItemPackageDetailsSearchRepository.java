package com.mogen.bundle.repository.search;

import com.mogen.bundle.domain.ItemPackageDetails;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link ItemPackageDetails} entity.
 */
public interface ItemPackageDetailsSearchRepository extends ElasticsearchRepository<ItemPackageDetails, Long> {
}
