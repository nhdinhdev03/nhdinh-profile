package com.nhdinh.nhdinh_profile.modules.ProfileInfo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for ProfileInfo entity
 */
@Repository
public interface ProfileInfoDAO extends JpaRepository<ProfileInfo, UUID> {

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
    
    /**
     * Find all profiles
     */
    @Query("SELECT p FROM ProfileInfo p ORDER BY p.createdAt DESC")
    List<ProfileInfo> findAllProfiles();
    
    /**
     * Find all profiles với phân trang
     */
    @Query("SELECT p FROM ProfileInfo p ORDER BY p.createdAt DESC")
    Page<ProfileInfo> findAllWithPagination(Pageable pageable);
}