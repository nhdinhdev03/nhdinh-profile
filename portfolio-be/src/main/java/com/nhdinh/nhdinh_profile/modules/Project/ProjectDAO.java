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
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.isFeatured = true AND p.status = 'published' ORDER BY p.sortOrder ASC")
    List<Project> findFeaturedProjects();
    
    /**
     * Lấy public projects
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.isPublic = true AND p.status = 'published' ORDER BY p.sortOrder ASC")
    List<Project> findPublicProjects();
    
    /**
     * Lấy projects theo category
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.category.categoryId = :categoryId ORDER BY p.sortOrder ASC")
    List<Project> findByCategory(@Param("categoryId") UUID categoryId);
    
    /**
     * Lấy project với translations và tags
     */
    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.translations t LEFT JOIN FETCH p.tagMaps tm LEFT JOIN FETCH tm.tag " +
           "WHERE p.projectId = :projectId AND p.isDeleted = false")
    Optional<Project> findByIdWithDetails(@Param("projectId") UUID projectId);
    
    /**
     * Lấy projects theo language
     */
    @Query("SELECT DISTINCT p FROM Project p LEFT JOIN p.translations t " +
           "WHERE p.isDeleted = false AND t.languageCode = :languageCode AND p.status = 'published' " +
           "ORDER BY p.sortOrder ASC")
    List<Project> findByLanguage(@Param("languageCode") String languageCode);
    
    /**
     * Search projects
     */
    @Query("SELECT DISTINCT p FROM Project p LEFT JOIN p.translations t " +
           "WHERE p.isDeleted = false AND p.status = 'published' AND " +
           "(LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY p.sortOrder ASC")
    List<Project> searchProjects(@Param("keyword") String keyword);
    
    /**
     * Lấy projects với pagination
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.status = 'published' ORDER BY p.sortOrder ASC, p.createdAt DESC")
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
     * Lấy projects được publish trong khoảng thời gian
     */
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.status = 'published' AND " +
           "p.publishedAt BETWEEN :startDate AND :endDate ORDER BY p.publishedAt DESC")
    List<Project> findPublishedBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}