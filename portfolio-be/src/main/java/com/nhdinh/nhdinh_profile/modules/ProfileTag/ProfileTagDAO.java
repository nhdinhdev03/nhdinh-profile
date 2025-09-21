package com.nhdinh.nhdinh_profile.modules.ProfileTag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * DAO interface for ProfileTag entity
 * Provides database operations for profile tags
 */
@Repository
public interface ProfileTagDAO extends JpaRepository<ProfileTag, UUID> {

    /**
     * Find all tags for a specific profile ordered by sort order
     */
    @Query("SELECT pt FROM ProfileTag pt " +
           "WHERE pt.profileInfo.profileId = :profileId " +
           "ORDER BY pt.sortOrder ASC, pt.createdAt ASC")
    List<ProfileTag> findAllByProfileIdOrderBySortOrder(@Param("profileId") UUID profileId);

    /**
     * Find tag by profile ID and label
     */
    @Query("SELECT pt FROM ProfileTag pt " +
           "WHERE pt.profileInfo.profileId = :profileId AND pt.label = :label")
    Optional<ProfileTag> findByProfileIdAndLabel(
            @Param("profileId") UUID profileId, 
            @Param("label") String label);

    /**
     * Find tags by label (case-insensitive search)
     */
    @Query("SELECT pt FROM ProfileTag pt " +
           "WHERE LOWER(pt.label) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "ORDER BY pt.profileInfo.profileId, pt.sortOrder")
    List<ProfileTag> findByLabelContainingIgnoreCase(@Param("searchTerm") String searchTerm);

    /**
     * Count tags for a specific profile
     */
    @Query("SELECT COUNT(pt) FROM ProfileTag pt WHERE pt.profileInfo.profileId = :profileId")
    long countByProfileId(@Param("profileId") UUID profileId);

    /**
     * Check if tag exists for profile
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProfileTag pt " +
           "WHERE pt.profileInfo.profileId = :profileId AND pt.label = :label")
    boolean existsByProfileIdAndLabel(
            @Param("profileId") UUID profileId, 
            @Param("label") String label);

    /**
     * Find tag with highest sort order for a profile
     */
    @Query("SELECT pt FROM ProfileTag pt " +
           "WHERE pt.profileInfo.profileId = :profileId " +
           "ORDER BY pt.sortOrder DESC")
    Optional<ProfileTag> findTopByProfileIdOrderBySortOrderDesc(@Param("profileId") UUID profileId);

    /**
     * Find tags with sort order greater than specified value
     */
    @Query("SELECT pt FROM ProfileTag pt " +
           "WHERE pt.profileInfo.profileId = :profileId AND pt.sortOrder > :sortOrder " +
           "ORDER BY pt.sortOrder ASC")
    List<ProfileTag> findByProfileIdAndSortOrderGreaterThan(
            @Param("profileId") UUID profileId, 
            @Param("sortOrder") Integer sortOrder);

    /**
     * Update sort order for tags after a specific position
     */
    @Query("UPDATE ProfileTag pt SET pt.sortOrder = pt.sortOrder + 1 " +
           "WHERE pt.profileInfo.profileId = :profileId AND pt.sortOrder >= :sortOrder")
    void incrementSortOrderFrom(@Param("profileId") UUID profileId, @Param("sortOrder") Integer sortOrder);

    /**
     * Delete all tags for a profile
     */
    @Query("DELETE FROM ProfileTag pt WHERE pt.profileInfo.profileId = :profileId")
    void deleteAllByProfileId(@Param("profileId") UUID profileId);

    /**
     * Get distinct labels across all profiles
     */
    @Query("SELECT DISTINCT pt.label FROM ProfileTag pt ORDER BY pt.label")
    List<String> findDistinctLabels();
}