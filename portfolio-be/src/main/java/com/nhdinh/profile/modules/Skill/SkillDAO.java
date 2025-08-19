package com.nhdinh.profile.modules.Skill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Skill Data Access Object
 * Handles database operations for Skill entities
 */
@Repository
public interface SkillDAO extends JpaRepository<Skill, UUID> {
    
    /**
     * Get all active skills ordered by sortOrder
     */
    @Query("SELECT s FROM Skill s LEFT JOIN s.skillCategory sc WHERE s.isActive = true ORDER BY sc.sortOrder ASC, s.sortOrder ASC, s.name ASC")
    List<Skill> getAllActiveSkills();
    
    /**
     * Get all skills by category ID
     */
    @Query("SELECT s FROM Skill s WHERE s.categoryId = :categoryId AND s.isActive = true ORDER BY s.sortOrder ASC, s.name ASC")
    List<Skill> getSkillsByCategory(@Param("categoryId") UUID categoryId);
    
    /**
     * Get all skills (including inactive)
     */
    @Query("SELECT s FROM Skill s LEFT JOIN s.skillCategory sc ORDER BY sc.sortOrder ASC, s.sortOrder ASC, s.name ASC")
    List<Skill> getAllSkills();
    
    /**
     * Find skills by active status
     */
    List<Skill> findByIsActiveOrderBySortOrderAscNameAsc(boolean isActive);
}
