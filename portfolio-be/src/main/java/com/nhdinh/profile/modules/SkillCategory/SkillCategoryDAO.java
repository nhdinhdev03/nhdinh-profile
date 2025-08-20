package com.nhdinh.profile.modules.SkillCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * SkillCategory Data Access Object
 * Handles database operations for SkillCategory entities
 */
@Repository
public interface SkillCategoryDAO extends JpaRepository<SkillCategory, UUID> {
    
    /**
     * Get all active skill categories ordered by sortOrder
     */
    @Query("SELECT sc FROM SkillCategory sc WHERE sc.isActive = true ORDER BY sc.sortOrder ASC, sc.name ASC")
    List<SkillCategory> getAllActiveCategories();
    
    /**
     * Get all skill categories (including inactive) ordered by sortOrder
     */
    @Query("SELECT sc FROM SkillCategory sc ORDER BY sc.sortOrder ASC, sc.name ASC")
    List<SkillCategory> getAllCategories();
    
    /**
     * Find categories by active status
     */
    List<SkillCategory> findByIsActiveOrderBySortOrderAscNameAsc(boolean isActive);
}
