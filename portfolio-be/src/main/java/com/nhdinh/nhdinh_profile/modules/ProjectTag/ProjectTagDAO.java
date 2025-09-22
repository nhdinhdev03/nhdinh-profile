package com.nhdinh.nhdinh_profile.modules.ProjectTag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for ProjectTag entity
 */
@Repository
public interface ProjectTagDAO extends JpaRepository<ProjectTag, UUID> {
    
    /**
     * Tìm tag theo tên
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.name = :name")
    Optional<ProjectTag> findByName(@Param("name") String name);
    
    /**
     * Kiểm tra tag có tồn tại theo tên
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProjectTag pt WHERE pt.name = :name")
    boolean existsByName(@Param("name") String name);
    
    /**
     * Lấy tất cả tags active
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.isActive = true ORDER BY pt.name ASC")
    List<ProjectTag> findAllActive();
    
    /**
     * Lấy tags theo category
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.category = :category AND pt.isActive = true ORDER BY pt.name ASC")
    List<ProjectTag> findByCategory(@Param("category") String category);
    
    /**
     * Lấy tags được sử dụng nhiều nhất
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.isActive = true ORDER BY pt.usageCount DESC, pt.name ASC")
    List<ProjectTag> findMostUsedTags();
    
    /**
     * Lấy tags có projects
     */
    @Query("SELECT DISTINCT pt FROM ProjectTag pt INNER JOIN pt.projectMaps pm INNER JOIN pm.project p " +
           "WHERE pt.isActive = true AND p.isDeleted = false AND p.isPublic = true ORDER BY pt.name ASC")
    List<ProjectTag> findTagsWithPublicProjects();
    
    /**
     * Cập nhật usage count
     */
    @Modifying
    @Query("UPDATE ProjectTag pt SET pt.usageCount = pt.usageCount + 1 WHERE pt.tagId = :tagId")
    void incrementUsageCount(@Param("tagId") UUID tagId);
    
    /**
     * Đếm số projects sử dụng tag
     */
    @Query("SELECT COUNT(pm) FROM ProjectTagMap pm WHERE pm.tag.tagId = :tagId AND pm.project.isDeleted = false AND pm.project.isPublic = true")
    Long countProjectsUsingTag(@Param("tagId") UUID tagId);
}


