package com.mogen.bundle.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mogen.bundle.web.rest.TestUtil;

public class PkgImagesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PkgImages.class);
        PkgImages pkgImages1 = new PkgImages();
        pkgImages1.setId(1L);
        PkgImages pkgImages2 = new PkgImages();
        pkgImages2.setId(pkgImages1.getId());
        assertThat(pkgImages1).isEqualTo(pkgImages2);
        pkgImages2.setId(2L);
        assertThat(pkgImages1).isNotEqualTo(pkgImages2);
        pkgImages1.setId(null);
        assertThat(pkgImages1).isNotEqualTo(pkgImages2);
    }
}
