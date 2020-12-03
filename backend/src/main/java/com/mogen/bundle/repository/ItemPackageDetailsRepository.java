package com.mogen.bundle.repository;

import com.mogen.bundle.domain.ItemPackageDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ItemPackageDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemPackageDetailsRepository extends JpaRepository<ItemPackageDetails, Long> {
}
