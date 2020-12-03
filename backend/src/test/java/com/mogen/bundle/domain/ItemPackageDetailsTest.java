package com.mogen.bundle.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mogen.bundle.web.rest.TestUtil;

public class ItemPackageDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemPackageDetails.class);
        ItemPackageDetails itemPackageDetails1 = new ItemPackageDetails();
        itemPackageDetails1.setId(1L);
        ItemPackageDetails itemPackageDetails2 = new ItemPackageDetails();
        itemPackageDetails2.setId(itemPackageDetails1.getId());
        assertThat(itemPackageDetails1).isEqualTo(itemPackageDetails2);
        itemPackageDetails2.setId(2L);
        assertThat(itemPackageDetails1).isNotEqualTo(itemPackageDetails2);
        itemPackageDetails1.setId(null);
        assertThat(itemPackageDetails1).isNotEqualTo(itemPackageDetails2);
    }
}
