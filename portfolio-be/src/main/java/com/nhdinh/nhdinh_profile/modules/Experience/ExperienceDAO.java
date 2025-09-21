package com.nhdinh.nhdinh_profile.modules.Experience;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * DAO interface for Experience entity
 * Provides database operations for work experience
 */
@Repository
public interface ExperienceDAO extends JpaRepository<Experience, UUID> {

    /**
     * Find all experiences for a specific profile ordered by sort order
     */
    @Query("SELECT e FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId " +
           "ORDER BY e.sortOrder ASC, e.startYear DESC")
    List<Experience> findAllByProfileIdOrderBySortOrder(@Param("profileId") UUID profileId);

    /**
     * Find current experiences (isCurrent = true)
     */
    @Query("SELECT e FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId AND e.isCurrent = true " +
           "ORDER BY e.sortOrder ASC, e.startYear DESC")
    List<Experience> findCurrentExperiencesByProfileId(@Param("profileId") UUID profileId);

    /**
     * Find past experiences (isCurrent = false)
     */
    @Query("SELECT e FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId AND e.isCurrent = false " +
           "ORDER BY e.sortOrder ASC, e.endYear DESC")
    List<Experience> findPastExperiencesByProfileId(@Param("profileId") UUID profileId);

    /**
     * Find experiences by company
     */
    @Query("SELECT e FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId " +
           "AND LOWER(e.company) LIKE LOWER(CONCAT('%', :company, '%')) " +
           "ORDER BY e.startYear DESC")
    List<Experience> findByProfileIdAndCompanyContainingIgnoreCase(
            @Param("profileId") UUID profileId, 
            @Param("company") String company);

    /**
     * Find experiences by position
     */
    @Query("SELECT e FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId " +
           "AND LOWER(e.position) LIKE LOWER(CONCAT('%', :position, '%')) " +
           "ORDER BY e.startYear DESC")
    List<Experience> findByProfileIdAndPositionContainingIgnoreCase(
            @Param("profileId") UUID profileId, 
            @Param("position") String position);

    /**
     * Find experiences by year range
     */
    @Query("SELECT e FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId " +
           "AND ((e.startYear <= :year AND (e.endYear >= :year OR e.isCurrent = true)) " +
           "OR e.startYear = :year) " +
           "ORDER BY e.startYear DESC")
    List<Experience> findByProfileIdAndYear(
            @Param("profileId") UUID profileId, 
            @Param("year") Integer year);

    /**
     * Count experiences for a profile
     */
    @Query("SELECT COUNT(e) FROM Experience e WHERE e.profileInfo.profileId = :profileId")
    long countByProfileId(@Param("profileId") UUID profileId);

    /**
     * Find experience with highest sort order
     */
    @Query("SELECT e FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId " +
           "ORDER BY e.sortOrder DESC")
    Optional<Experience> findTopByProfileIdOrderBySortOrderDesc(@Param("profileId") UUID profileId);

    /**
     * Find experiences with sort order greater than specified value
     */
    @Query("SELECT e FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId AND e.sortOrder > :sortOrder " +
           "ORDER BY e.sortOrder ASC")
    List<Experience> findByProfileIdAndSortOrderGreaterThan(
            @Param("profileId") UUID profileId, 
            @Param("sortOrder") Integer sortOrder);

    /**
     * Update sort order for experiences after a specific position
     */
    @Query("UPDATE Experience e SET e.sortOrder = e.sortOrder + 1 " +
           "WHERE e.profileInfo.profileId = :profileId AND e.sortOrder >= :sortOrder")
    void incrementSortOrderFrom(@Param("profileId") UUID profileId, @Param("sortOrder") Integer sortOrder);

    /**
     * Search experiences by description content
     */
    @Query("SELECT e FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId " +
           "AND LOWER(e.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "ORDER BY e.startYear DESC")
    List<Experience> searchByDescription(
            @Param("profileId") UUID profileId, 
            @Param("searchTerm") String searchTerm);

    /**
     * Delete all experiences for a profile
     */
    @Query("DELETE FROM Experience e WHERE e.profileInfo.profileId = :profileId")
    void deleteAllByProfileId(@Param("profileId") UUID profileId);

    /**
     * Get distinct companies across all experiences for a profile
     */
    @Query("SELECT DISTINCT e.company FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId AND e.company IS NOT NULL " +
           "ORDER BY e.company")
    List<String> findDistinctCompaniesByProfileId(@Param("profileId") UUID profileId);

    /**
     * Get distinct positions across all experiences for a profile
     */
    @Query("SELECT DISTINCT e.position FROM Experience e " +
           "WHERE e.profileInfo.profileId = :profileId AND e.position IS NOT NULL " +
           "ORDER BY e.position")
    List<String> findDistinctPositionsByProfileId(@Param("profileId") UUID profileId);
}