package com.mogen.bundle.repository.search;

import com.mogen.bundle.domain.PkgImages;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link PkgImages} entity.
 */
public interface PkgImagesSearchRepository extends ElasticsearchRepository<PkgImages, Long> {
}
