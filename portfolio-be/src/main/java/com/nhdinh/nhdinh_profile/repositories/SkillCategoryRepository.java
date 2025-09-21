package com.nhdinh.nhdinh_profile.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhdinh.nhdinh_profile.modules.SkillCategory.SkillCategory;

/**
 * JpaRepository interface for SkillCategory entity
 */
@Repository
public interface SkillCategoryRepository extends JpaRepository<SkillCategory, UUID> {
    
    /**
     * Lấy tất cả categories active
     */
    @Query("SELECT sc FROM SkillCategory sc WHERE sc.isActive = true ORDER BY sc.sortOrder ASC, sc.name ASC")
    List<SkillCategory> findAllActive();
    
    /**
     * Tìm category theo tên
     */
    @Query("SELECT sc FROM SkillCategory sc WHERE sc.name = :name")
    Optional<SkillCategory> findByName(@Param("name") String name);
    
    /**
     * Kiểm tra category có tồn tại theo tên
     */
    @Query("SELECT COUNT(sc) > 0 FROM SkillCategory sc WHERE sc.name = :name")
    boolean existsByName(@Param("name") String name);
    
    /**
     * Lấy categories có skills
     */
    @Query("SELECT DISTINCT sc FROM SkillCategory sc INNER JOIN sc.skills s WHERE sc.isActive = true AND s.isActive = true ORDER BY sc.sortOrder ASC")
    List<SkillCategory> findCategoriesWithActiveSkills();
    
    /**
     * Đếm số skills trong category
     */
    @Query("SELECT COUNT(s) FROM Skill s WHERE s.category.categoryId = :categoryId AND s.isActive = true")
    Long countActiveSkillsInCategory(@Param("categoryId") UUID categoryId);
}