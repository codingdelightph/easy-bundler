package com.mogen.bundle.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mogen.bundle.web.rest.TestUtil;

public class ItemPackageTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemPackage.class);
        ItemPackage itemPackage1 = new ItemPackage();
        itemPackage1.setId(1L);
        ItemPackage itemPackage2 = new ItemPackage();
        itemPackage2.setId(itemPackage1.getId());
        assertThat(itemPackage1).isEqualTo(itemPackage2);
        itemPackage2.setId(2L);
        assertThat(itemPackage1).isNotEqualTo(itemPackage2);
        itemPackage1.setId(null);
        assertThat(itemPackage1).isNotEqualTo(itemPackage2);
    }
}
