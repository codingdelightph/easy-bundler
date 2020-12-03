package com.mogen.bundle.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mogen.bundle.web.rest.TestUtil;

public class ItemMasterTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemMaster.class);
        ItemMaster itemMaster1 = new ItemMaster();
        itemMaster1.setId(1L);
        ItemMaster itemMaster2 = new ItemMaster();
        itemMaster2.setId(itemMaster1.getId());
        assertThat(itemMaster1).isEqualTo(itemMaster2);
        itemMaster2.setId(2L);
        assertThat(itemMaster1).isNotEqualTo(itemMaster2);
        itemMaster1.setId(null);
        assertThat(itemMaster1).isNotEqualTo(itemMaster2);
    }
}
