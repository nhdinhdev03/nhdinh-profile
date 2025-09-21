package com.nhdinh.nhdinh_profile.modules.ProjectTag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTagDAO extends JpaRepository<ProjectTag, UUID> {
    
    /**
     * Lấy tag theo tên
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.name = :name")
    Optional<ProjectTag> findByName(@Param("name") String name);
    
    /**
     * Lấy tất cả active tags
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.isActive = true ORDER BY pt.usageCount DESC, pt.name ASC")
    List<ProjectTag> findAllActive();
    
    /**
     * Lấy tags theo category
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.isActive = true AND pt.category = :category ORDER BY pt.usageCount DESC")
    List<ProjectTag> findByCategory(@Param("category") String category);
    
    /**
     * Lấy popular tags
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.isActive = true ORDER BY pt.usageCount DESC")
    List<ProjectTag> findPopularTags();
    
    /**
     * Lấy tags được sử dụng cho projects
     */
    @Query("SELECT DISTINCT pt FROM ProjectTag pt JOIN pt.projectMaps pm JOIN pm.project p " +
           "WHERE pt.isActive = true AND p.isDeleted = false AND p.status = 'published' " +
           "ORDER BY pt.usageCount DESC")
    List<ProjectTag> findTagsUsedInPublishedProjects();
    
    /**
     * Kiểm tra tag có tồn tại
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProjectTag pt WHERE pt.name = :name")
    boolean existsByName(@Param("name") String name);
    
    /**
     * Update usage count
     */
    @Modifying
    @Query("UPDATE ProjectTag pt SET pt.usageCount = pt.usageCount + :increment WHERE pt.tagId = :tagId")
    void updateUsageCount(@Param("tagId") UUID tagId, @Param("increment") int increment);
    
    /**
     * Search tags
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.isActive = true AND " +
           "(LOWER(pt.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(pt.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY pt.usageCount DESC")
    List<ProjectTag> searchTags(@Param("keyword") String keyword);
}