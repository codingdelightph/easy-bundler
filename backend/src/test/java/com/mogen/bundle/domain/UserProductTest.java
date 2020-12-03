package com.mogen.bundle.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mogen.bundle.web.rest.TestUtil;

public class UserProductTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProduct.class);
        UserProduct userProduct1 = new UserProduct();
        userProduct1.setId(1L);
        UserProduct userProduct2 = new UserProduct();
        userProduct2.setId(userProduct1.getId());
        assertThat(userProduct1).isEqualTo(userProduct2);
        userProduct2.setId(2L);
        assertThat(userProduct1).isNotEqualTo(userProduct2);
        userProduct1.setId(null);
        assertThat(userProduct1).isNotEqualTo(userProduct2);
    }
}
