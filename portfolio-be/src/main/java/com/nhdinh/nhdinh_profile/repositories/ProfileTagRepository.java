package com.nhdinh.nhdinh_profile.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhdinh.nhdinh_profile.modules.ProfileTag.ProfileTag;

/**
 * JpaRepository interface for ProfileTag entity
 */
@Repository
public interface ProfileTagRepository extends JpaRepository<ProfileTag, UUID> {
    
    /**
     * Lấy tất cả tags của một profile
     */
    @Query("SELECT pt FROM ProfileTag pt WHERE pt.profileInfo.profileId = :profileId ORDER BY pt.sortOrder ASC")
    List<ProfileTag> findByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Lấy max sort order của profile
     */
    @Query("SELECT COALESCE(MAX(pt.sortOrder), 0) FROM ProfileTag pt WHERE pt.profileInfo.profileId = :profileId")
    Integer findMaxSortOrderByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Đếm số tags của profile
     */
    @Query("SELECT COUNT(pt) FROM ProfileTag pt WHERE pt.profileInfo.profileId = :profileId")
    Long countByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Tìm tag theo label và profile
     */
    @Query("SELECT pt FROM ProfileTag pt WHERE pt.profileInfo.profileId = :profileId AND pt.label = :label")
    List<ProfileTag> findByProfileIdAndLabel(@Param("profileId") UUID profileId, @Param("label") String label);
}