package com.nhdinh.nhdinh_profile.modules.Project;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for Project entity
 */
@Repository
public interface ProjectDAO extends JpaRepository<Project, UUID> {
    
    /**
     * Lấy tất cả projects active
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false ORDER BY p.sortOrder ASC, p.createdAt DESC")
    List<Project> findAllActive();
    
    /**
     * Lấy projects theo status
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.status = :status ORDER BY p.sortOrder ASC")
    List<Project> findByStatus(@Param("status") String status);
    
    /**
     * Lấy featured projects
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.isFeatured = true AND p.isPublic = true ORDER BY p.sortOrder ASC")
    List<Project> findFeaturedProjects();
    
    /**
     * Lấy public projects
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.isPublic = true ORDER BY p.sortOrder ASC, p.createdAt DESC")
    List<Project> findPublicProjects();
    
    /**
     * Lấy projects theo category
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.category.categoryId = :categoryId ORDER BY p.sortOrder ASC")
    List<Project> findByCategoryId(@Param("categoryId") UUID categoryId);
    
    /**
     * Lấy project với translations và tags
     */
    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.translations LEFT JOIN FETCH p.tagMaps tm LEFT JOIN FETCH tm.tag " +
           "WHERE p.projectId = :projectId AND p.isDeleted = false")
    Optional<Project> findByIdWithTranslationsAndTags(@Param("projectId") UUID projectId);
    
    /**
     * Lấy projects published
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.status = 'published' AND p.isPublic = true ORDER BY p.publishedAt DESC")
    Page<Project> findPublishedProjects(Pageable pageable);
    
    /**
     * Soft delete project
     */
    @Modifying
    @Query("UPDATE Project p SET p.isDeleted = true WHERE p.projectId = :projectId")
    void softDeleteById(@Param("projectId") UUID projectId);
    
    /**
     * Update view count
     */
    @Modifying
    @Query("UPDATE Project p SET p.viewCount = p.viewCount + 1 WHERE p.projectId = :projectId")
    void incrementViewCount(@Param("projectId") UUID projectId);
    
    /**
     * Update published status
     */
    @Modifying
    @Query("UPDATE Project p SET p.status = 'published', p.publishedAt = :publishedAt WHERE p.projectId = :projectId")
    void publishProject(@Param("projectId") UUID projectId, @Param("publishedAt") LocalDateTime publishedAt);
}