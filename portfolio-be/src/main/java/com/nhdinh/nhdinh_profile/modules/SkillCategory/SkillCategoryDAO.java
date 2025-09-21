package com.nhdinh.nhdinh_profile.modules.SkillCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * DAO interface for SkillCategory entity
 * Provides database operations for skill categories
 */
@Repository
public interface SkillCategoryDAO extends JpaRepository<SkillCategory, UUID> {

    /**
     * Find all active categories ordered by sort order
     */
    @Query("SELECT sc FROM SkillCategory sc " +
           "WHERE sc.isActive = true " +
           "ORDER BY sc.sortOrder ASC, sc.name ASC")
    List<SkillCategory> findAllActiveOrderBySortOrder();

    /**
     * Find all categories ordered by sort order (including inactive)
     */
    @Query("SELECT sc FROM SkillCategory sc " +
           "ORDER BY sc.sortOrder ASC, sc.name ASC")
    List<SkillCategory> findAllOrderBySortOrder();

    /**
     * Find category by name (case-insensitive)
     */
    @Query("SELECT sc FROM SkillCategory sc " +
           "WHERE LOWER(sc.name) = LOWER(:name)")
    Optional<SkillCategory> findByNameIgnoreCase(@Param("name") String name);

    /**
     * Check if category exists by name (case-insensitive)
     */
    @Query("SELECT COUNT(sc) > 0 FROM SkillCategory sc " +
           "WHERE LOWER(sc.name) = LOWER(:name)")
    boolean existsByNameIgnoreCase(@Param("name") String name);

    /**
     * Find categories by name containing search term
     */
    @Query("SELECT sc FROM SkillCategory sc " +
           "WHERE LOWER(sc.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "ORDER BY sc.sortOrder ASC")
    List<SkillCategory> findByNameContainingIgnoreCase(@Param("searchTerm") String searchTerm);

    /**
     * Find category with highest sort order
     */
    @Query("SELECT sc FROM SkillCategory sc " +
           "ORDER BY sc.sortOrder DESC")
    Optional<SkillCategory> findTopBySortOrderDesc();

    /**
     * Find categories with sort order greater than specified value
     */
    @Query("SELECT sc FROM SkillCategory sc " +
           "WHERE sc.sortOrder > :sortOrder " +
           "ORDER BY sc.sortOrder ASC")
    List<SkillCategory> findBySortOrderGreaterThan(@Param("sortOrder") Integer sortOrder);

    /**
     * Update sort order for categories after a specific position
     */
    @Query("UPDATE SkillCategory sc SET sc.sortOrder = sc.sortOrder + 1 " +
           "WHERE sc.sortOrder >= :sortOrder")
    void incrementSortOrderFrom(@Param("sortOrder") Integer sortOrder);

    /**
     * Get category with skills count
     */
    @Query("SELECT sc FROM SkillCategory sc " +
           "LEFT JOIN FETCH Skill s ON s.skillCategory = sc " +
           "WHERE sc.categoryId = :categoryId")
    Optional<SkillCategory> findByIdWithSkills(@Param("categoryId") UUID categoryId);

    /**
     * Find categories that have active skills
     */
    @Query("SELECT DISTINCT sc FROM SkillCategory sc " +
           "INNER JOIN Skill s ON s.skillCategory = sc " +
           "WHERE sc.isActive = true AND s.isActive = true " +
           "ORDER BY sc.sortOrder ASC")
    List<SkillCategory> findCategoriesWithActiveSkills();

    /**
     * Count active skills in each category
     */
    @Query("SELECT sc.categoryId, sc.name, COUNT(s) as skillCount FROM SkillCategory sc " +
           "LEFT JOIN Skill s ON s.skillCategory = sc AND s.isActive = true " +
           "WHERE sc.isActive = true " +
           "GROUP BY sc.categoryId, sc.name " +
           "ORDER BY sc.sortOrder ASC")
    List<Object[]> findCategoriesWithSkillCount();

    /**
     * Toggle active status
     */
    @Query("UPDATE SkillCategory sc SET sc.isActive = :isActive " +
           "WHERE sc.categoryId = :categoryId")
    void updateActiveStatus(@Param("categoryId") UUID categoryId, @Param("isActive") Boolean isActive);
}