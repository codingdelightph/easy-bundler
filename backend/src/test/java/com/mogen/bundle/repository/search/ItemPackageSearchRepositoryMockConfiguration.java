package com.mogen.bundle.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ItemPackageSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ItemPackageSearchRepositoryMockConfiguration {

    @MockBean
    private ItemPackageSearchRepository mockItemPackageSearchRepository;

}
