package com.nhdinh.nhdinh_profile.modules.ProfileInfo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * DAO interface for ProfileInfo entity
 * Provides database operations for profile information
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
     * Find profile by avatar URL
     */
    @Query("SELECT p FROM ProfileInfo p WHERE p.avatarUrl = :avatarUrl")
    Optional<ProfileInfo> findByAvatarUrl(@Param("avatarUrl") String avatarUrl);

    /**
     * Get profile with all translations
     */
    @Query("SELECT DISTINCT p FROM ProfileInfo p " +
           "LEFT JOIN FETCH ProfileTranslation pt ON pt.profileInfo = p " +
           "WHERE p.profileId = :profileId")
    Optional<ProfileInfo> findByIdWithTranslations(@Param("profileId") UUID profileId);

    /**
     * Get profile with all tags
     */
    @Query("SELECT DISTINCT p FROM ProfileInfo p " +
           "LEFT JOIN FETCH ProfileTag ptag ON ptag.profileInfo = p " +
           "WHERE p.profileId = :profileId " +
           "ORDER BY ptag.sortOrder ASC")
    Optional<ProfileInfo> findByIdWithTags(@Param("profileId") UUID profileId);

    /**
     * Get profile with all experiences
     */
    @Query("SELECT DISTINCT p FROM ProfileInfo p " +
           "LEFT JOIN FETCH Experience e ON e.profileInfo = p " +
           "WHERE p.profileId = :profileId " +
           "ORDER BY e.sortOrder ASC")
    Optional<ProfileInfo> findByIdWithExperiences(@Param("profileId") UUID profileId);

    /**
     * Get complete profile with all related data
     */
    @Query("SELECT DISTINCT p FROM ProfileInfo p " +
           "LEFT JOIN FETCH ProfileTranslation pt ON pt.profileInfo = p " +
           "LEFT JOIN FETCH ProfileTag ptag ON ptag.profileInfo = p " +
           "LEFT JOIN FETCH Experience e ON e.profileInfo = p " +
           "WHERE p.profileId = :profileId " +
           "ORDER BY ptag.sortOrder ASC, e.sortOrder ASC")
    Optional<ProfileInfo> findCompleteProfile(@Param("profileId") UUID profileId);
}