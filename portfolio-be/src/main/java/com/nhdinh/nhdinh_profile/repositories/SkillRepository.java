package com.nhdinh.nhdinh_profile.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhdinh.nhdinh_profile.modules.Skill.Skill;

/**
 * JpaRepository interface for Skill entity
 */
@Repository
public interface SkillRepository extends JpaRepository<Skill, UUID> {
    
    /**
     * Lấy tất cả skills active
     */
    @Query("SELECT s FROM Skill s WHERE s.isActive = true ORDER BY s.category.sortOrder ASC, s.sortOrder ASC, s.name ASC")
    List<Skill> findAllActive();
    
    /**
     * Lấy skills theo category
     */
    @Query("SELECT s FROM Skill s WHERE s.category.categoryId = :categoryId AND s.isActive = true ORDER BY s.sortOrder ASC, s.name ASC")
    List<Skill> findByCategoryId(@Param("categoryId") UUID categoryId);
    
    /**
     * Tìm skill theo tên trong category
     */
    @Query("SELECT s FROM Skill s WHERE s.category.categoryId = :categoryId AND s.name = :name")
    Optional<Skill> findByCategoryIdAndName(@Param("categoryId") UUID categoryId, @Param("name") String name);
    
    /**
     * Kiểm tra skill có tồn tại trong category
     */
    @Query("SELECT COUNT(s) > 0 FROM Skill s WHERE s.category.categoryId = :categoryId AND s.name = :name")
    boolean existsByCategoryIdAndName(@Param("categoryId") UUID categoryId, @Param("name") String name);
    
    /**
     * Lấy max sort order trong category
     */
    @Query("SELECT COALESCE(MAX(s.sortOrder), 0) FROM Skill s WHERE s.category.categoryId = :categoryId")
    Integer findMaxSortOrderByCategoryId(@Param("categoryId") UUID categoryId);
    
    /**
     * Tìm kiếm skills theo tên
     */
    @Query("SELECT s FROM Skill s WHERE s.isActive = true AND LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY s.name ASC")
    List<Skill> searchByName(@Param("keyword") String keyword);
}