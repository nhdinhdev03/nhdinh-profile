package com.nhdinh.nhdinh_profile.modules.SkillCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for SkillCategory entity
 */
@Repository
public interface SkillCategoryDAO extends JpaRepository<SkillCategory, UUID> {
    
    /**
     * Lấy tất cả categories active
     */
    @Query("SELECT sc FROM SkillCategory sc WHERE sc.isActive = true ORDER BY sc.sortOrder ASC, sc.name ASC")
    List<SkillCategory> findAllActive();
    
    /**
     * Lấy tất cả categories active với phân trang
     */
    @Query("SELECT sc FROM SkillCategory sc WHERE sc.isActive = true ORDER BY sc.sortOrder ASC, sc.name ASC")
    Page<SkillCategory> findAllActiveWithPagination(Pageable pageable);
    
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
     * Lấy categories có skills - sử dụng subquery thay vì JOIN
     */
    @Query("SELECT DISTINCT sc FROM SkillCategory sc WHERE sc.isActive = true AND EXISTS (SELECT 1 FROM Skill s WHERE s.skillCategory = sc AND s.isActive = true) ORDER BY sc.sortOrder ASC")
    List<SkillCategory> findCategoriesWithActiveSkills();
    
    /**
     * Đếm số skills trong category
     */
    @Query("SELECT COUNT(s) FROM Skill s WHERE s.skillCategory.categoryId = :categoryId AND s.isActive = true")
    Long countActiveSkillsInCategory(@Param("categoryId") UUID categoryId);
}