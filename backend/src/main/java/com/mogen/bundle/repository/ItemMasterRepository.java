package com.mogen.bundle.repository;

import com.mogen.bundle.domain.ItemMaster;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ItemMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemMasterRepository extends JpaRepository<ItemMaster, Long> {

    @Query("select itemMaster from ItemMaster itemMaster where itemMaster.user.login = ?#{principal.preferredUsername}")
    List<ItemMaster> findByUserIsCurrentUser();
}
