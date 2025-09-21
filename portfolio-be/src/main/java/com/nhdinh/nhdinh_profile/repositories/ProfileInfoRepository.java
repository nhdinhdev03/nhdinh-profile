package com.nhdinh.nhdinh_profile.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhdinh.nhdinh_profile.modules.ProfileInfo.ProfileInfo;

/**
 * JpaRepository interface for ProfileInfo entity
 */
@Repository
public interface ProfileInfoRepository extends JpaRepository<ProfileInfo, UUID> {

    /**
     * Find the active profile (assuming only one profile exists)
     */
    @Query("SELECT p FROM ProfileInfo p ORDER BY p.createdAt ASC")
    Optional<ProfileInfo> findActiveProfile();

    /**
     * Check if any profile exists
     */
    @Query("SELECT COUNT(p) > 0 FROM ProfileInfo p")
    boolean existsAnyProfile();

    /**
     * Find profile by ID
     */
    @Query("SELECT p FROM ProfileInfo p WHERE p.profileId = :profileId")
    Optional<ProfileInfo> findByIdWithTranslations(@Param("profileId") UUID profileId);
}
