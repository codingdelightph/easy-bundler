package com.mogen.bundle.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link UserProductSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class UserProductSearchRepositoryMockConfiguration {

    @MockBean
    private UserProductSearchRepository mockUserProductSearchRepository;

}
