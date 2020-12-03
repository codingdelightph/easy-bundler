package com.mogen.bundle.repository;

import com.mogen.bundle.domain.ItemPackage;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ItemPackage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemPackageRepository extends JpaRepository<ItemPackage, Long> {
}
