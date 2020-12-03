package com.mogen.bundle.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link PkgImagesSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class PkgImagesSearchRepositoryMockConfiguration {

    @MockBean
    private PkgImagesSearchRepository mockPkgImagesSearchRepository;

}
