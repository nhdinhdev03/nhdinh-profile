package com.nhdinh.nhdinh_profile.modules.Experience;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for Experience entity
 */
@Repository
public interface ExperienceDAO extends JpaRepository<Experience, UUID> {
    
    /**
     * Lấy tất cả experiences của một profile
     */
    @Query("SELECT e FROM Experience e WHERE e.profileInfo.profileId = :profileId ORDER BY e.sortOrder ASC, e.startYear DESC")
    List<Experience> findByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Lấy current experiences
     */
    @Query("SELECT e FROM Experience e WHERE e.profileInfo.profileId = :profileId AND e.isCurrent = true ORDER BY e.sortOrder ASC")
    List<Experience> findCurrentExperiencesByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Lấy past experiences
     */
    @Query("SELECT e FROM Experience e WHERE e.profileInfo.profileId = :profileId AND e.isCurrent = false ORDER BY e.endYear DESC, e.sortOrder ASC")
    List<Experience> findPastExperiencesByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Lấy experiences theo company
     */
    @Query("SELECT e FROM Experience e WHERE e.profileInfo.profileId = :profileId AND LOWER(e.company) LIKE LOWER(CONCAT('%', :company, '%')) ORDER BY e.startYear DESC")
    List<Experience> findByProfileIdAndCompany(@Param("profileId") UUID profileId, @Param("company") String company);
    
    /**
     * Lấy max sort order của profile
     */
    @Query("SELECT COALESCE(MAX(e.sortOrder), 0) FROM Experience e WHERE e.profileInfo.profileId = :profileId")
    Integer findMaxSortOrderByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Đếm số experiences của profile
     */
    @Query("SELECT COUNT(e) FROM Experience e WHERE e.profileInfo.profileId = :profileId")
    Long countByProfileId(@Param("profileId") UUID profileId);
}