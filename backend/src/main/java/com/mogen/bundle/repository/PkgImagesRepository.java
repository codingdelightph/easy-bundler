package com.mogen.bundle.repository;

import com.mogen.bundle.domain.PkgImages;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PkgImages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PkgImagesRepository extends JpaRepository<PkgImages, Long> {
}
