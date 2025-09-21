package com.nhdinh.nhdinh_profile.modules.Skill;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * DAO interface for Skill entity
 * Provides database operations for skills
 */
@Repository
public interface SkillDAO extends JpaRepository<Skill, UUID> {

    /**
     * Find all active skills ordered by category and sort order
     */
    @Query("SELECT s FROM Skill s " +
           "JOIN s.skillCategory sc " +
           "WHERE s.isActive = true AND sc.isActive = true " +
           "ORDER BY sc.sortOrder ASC, s.sortOrder ASC, s.name ASC")
    List<Skill> findAllActiveOrderByCategoryAndSortOrder();

    /**
     * Find skills by category ID ordered by sort order
     */
    @Query("SELECT s FROM Skill s " +
           "WHERE s.skillCategory.categoryId = :categoryId " +
           "ORDER BY s.sortOrder ASC, s.name ASC")
    List<Skill> findByCategoryIdOrderBySortOrder(@Param("categoryId") UUID categoryId);

    /**
     * Find active skills by category ID
     */
    @Query("SELECT s FROM Skill s " +
           "WHERE s.skillCategory.categoryId = :categoryId AND s.isActive = true " +
           "ORDER BY s.sortOrder ASC, s.name ASC")
    List<Skill> findActiveByCategoryIdOrderBySortOrder(@Param("categoryId") UUID categoryId);

    /**
     * Find skill by category ID and name (case-insensitive)
     */
    @Query("SELECT s FROM Skill s " +
           "WHERE s.skillCategory.categoryId = :categoryId " +
           "AND LOWER(s.name) = LOWER(:name)")
    Optional<Skill> findByCategoryIdAndNameIgnoreCase(
            @Param("categoryId") UUID categoryId, 
            @Param("name") String name);

    /**
     * Check if skill exists in category by name
     */
    @Query("SELECT COUNT(s) > 0 FROM Skill s " +
           "WHERE s.skillCategory.categoryId = :categoryId " +
           "AND LOWER(s.name) = LOWER(:name)")
    boolean existsByCategoryIdAndNameIgnoreCase(
            @Param("categoryId") UUID categoryId, 
            @Param("name") String name);

    /**
     * Find skills by name containing search term
     */
    @Query("SELECT s FROM Skill s " +
           "JOIN s.skillCategory sc " +
           "WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "AND s.isActive = true AND sc.isActive = true " +
           "ORDER BY sc.sortOrder ASC, s.sortOrder ASC")
    List<Skill> findByNameContainingIgnoreCase(@Param("searchTerm") String searchTerm);

    /**
     * Count skills in a category
     */
    @Query("SELECT COUNT(s) FROM Skill s WHERE s.skillCategory.categoryId = :categoryId")
    long countByCategoryId(@Param("categoryId") UUID categoryId);

    /**
     * Count active skills in a category
     */
    @Query("SELECT COUNT(s) FROM Skill s " +
           "WHERE s.skillCategory.categoryId = :categoryId AND s.isActive = true")
    long countActiveByCategoryId(@Param("categoryId") UUID categoryId);

    /**
     * Find skill with highest sort order in category
     */
    @Query("SELECT s FROM Skill s " +
           "WHERE s.skillCategory.categoryId = :categoryId " +
           "ORDER BY s.sortOrder DESC")
    Optional<Skill> findTopByCategoryIdOrderBySortOrderDesc(@Param("categoryId") UUID categoryId);

    /**
     * Find skills with sort order greater than specified value in category
     */
    @Query("SELECT s FROM Skill s " +
           "WHERE s.skillCategory.categoryId = :categoryId AND s.sortOrder > :sortOrder " +
           "ORDER BY s.sortOrder ASC")
    List<Skill> findByCategoryIdAndSortOrderGreaterThan(
            @Param("categoryId") UUID categoryId, 
            @Param("sortOrder") Integer sortOrder);

    /**
     * Update sort order for skills after a specific position in category
     */
    @Query("UPDATE Skill s SET s.sortOrder = s.sortOrder + 1 " +
           "WHERE s.skillCategory.categoryId = :categoryId AND s.sortOrder >= :sortOrder")
    void incrementSortOrderFromInCategory(
            @Param("categoryId") UUID categoryId, 
            @Param("sortOrder") Integer sortOrder);

    /**
     * Toggle active status
     */
    @Query("UPDATE Skill s SET s.isActive = :isActive " +
           "WHERE s.skillId = :skillId")
    void updateActiveStatus(@Param("skillId") UUID skillId, @Param("isActive") Boolean isActive);

    /**
     * Delete all skills in a category
     */
    @Query("DELETE FROM Skill s WHERE s.skillCategory.categoryId = :categoryId")
    void deleteAllByCategoryId(@Param("categoryId") UUID categoryId);

    /**
     * Find skills grouped by category (active only)
     */
    @Query("SELECT s FROM Skill s " +
           "JOIN FETCH s.skillCategory sc " +
           "WHERE s.isActive = true AND sc.isActive = true " +
           "ORDER BY sc.sortOrder ASC, s.sortOrder ASC")
    List<Skill> findAllActiveWithCategoryOrderBySortOrder();

    /**
     * Get distinct skill names across all categories
     */
    @Query("SELECT DISTINCT s.name FROM Skill s " +
           "WHERE s.isActive = true " +
           "ORDER BY s.name")
    List<String> findDistinctActiveSkillNames();

    /**
     * Find skills by multiple category IDs
     */
    @Query("SELECT s FROM Skill s " +
           "WHERE s.skillCategory.categoryId IN :categoryIds AND s.isActive = true " +
           "ORDER BY s.skillCategory.sortOrder ASC, s.sortOrder ASC")
    List<Skill> findActiveByCategoryIds(@Param("categoryIds") List<UUID> categoryIds);
}