package com.nhdinh.profile.modules.Project;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProjectDAO extends JpaRepository<Project, UUID> {
    
    /**
     * Tìm Project theo title
     */
    @Query("SELECT p FROM Project p WHERE p.title = :title")
    Optional<Project> findByTitle(@Param("title") String title);
    
    /**
     * Tìm Project theo title (case insensitive)
     */
    @Query("SELECT p FROM Project p WHERE LOWER(p.title) = LOWER(:title)")
    Optional<Project> findByTitleIgnoreCase(@Param("title") String title);
    
    /**
     * Tìm tất cả Project theo CategoryId
     */
    @Query("SELECT p FROM Project p WHERE p.category.categoryId = :categoryId ORDER BY p.createdAt DESC")
    List<Project> findByCategoryId(@Param("categoryId") UUID categoryId);
    
    /**
     * Tìm kiếm Project theo title (partial match)
     */
    @Query("SELECT p FROM Project p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY p.createdAt DESC")
    List<Project> findByTitleContainingIgnoreCase(@Param("keyword") String keyword);
    
    /**
     * Tìm kiếm Project theo title hoặc description
     */
    @Query("SELECT p FROM Project p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY p.createdAt DESC")
    List<Project> findByTitleOrDescriptionContainingIgnoreCase(@Param("keyword") String keyword);
    
    /**
     * Lấy tất cả Project sắp xếp theo ngày tạo mới nhất
     */
    @Query("SELECT p FROM Project p ORDER BY p.createdAt DESC")
    List<Project> findAllOrderByCreatedAtDesc();
    
    /**
     * Lấy tất cả Project sắp xếp theo title
     */
    @Query("SELECT p FROM Project p ORDER BY p.title")
    List<Project> findAllOrderByTitle();
    
    /**
     * Kiểm tra xem title đã tồn tại chưa
     */
    @Query("SELECT COUNT(p) > 0 FROM Project p WHERE LOWER(p.title) = LOWER(:title)")
    boolean existsByTitleIgnoreCase(@Param("title") String title);
    
    /**
     * Kiểm tra xem title đã tồn tại chưa (trừ record hiện tại)
     */
    @Query("SELECT COUNT(p) > 0 FROM Project p WHERE LOWER(p.title) = LOWER(:title) AND p.projectId != :projectId")
    boolean existsByTitleIgnoreCaseAndNotSelf(@Param("title") String title, @Param("projectId") UUID projectId);
    
    /**
     * Đếm số Project theo CategoryId
     */
    @Query("SELECT COUNT(p) FROM Project p WHERE p.category.categoryId = :categoryId")
    long countByCategoryId(@Param("categoryId") UUID categoryId);
    
    /**
     * Tìm Projects theo TagId
     */
    @Query("SELECT p FROM Project p JOIN p.tags t WHERE t.tagId = :tagId ORDER BY p.createdAt DESC")
    List<Project> findByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Tìm Projects theo tên tag
     */
    @Query("SELECT p FROM Project p JOIN p.tags t WHERE LOWER(t.name) = LOWER(:tagName) ORDER BY p.createdAt DESC")
    List<Project> findByTagName(@Param("tagName") String tagName);
    
    /**
     * Tìm Projects có chứa bất kỳ tag nào trong danh sách
     */
    @Query("SELECT DISTINCT p FROM Project p JOIN p.tags t WHERE t.tagId IN :tagIds ORDER BY p.createdAt DESC")
    List<Project> findByTagIds(@Param("tagIds") List<UUID> tagIds);
    
    /**
     * Tìm Projects có chứa tất cả tags trong danh sách
     */
    @Query("SELECT p FROM Project p WHERE SIZE(p.tags) >= :tagCount AND " +
           "(SELECT COUNT(t) FROM Project p2 JOIN p2.tags t WHERE p2 = p AND t.tagId IN :tagIds) = :tagCount " +
           "ORDER BY p.createdAt DESC")
    List<Project> findByAllTagIds(@Param("tagIds") List<UUID> tagIds, @Param("tagCount") int tagCount);
    
    /**
     * Lấy Projects công khai (published và public)
     */
    @Query("SELECT p FROM Project p WHERE p.status = 'published' AND p.isPublic = true ORDER BY p.sortOrder, p.createdAt DESC")
    List<Project> findPublicProjects();
    
    /**
     * Lấy Featured Projects
     */
    @Query("SELECT p FROM Project p WHERE p.isFeatured = true AND p.status = 'published' AND p.isPublic = true ORDER BY p.sortOrder, p.createdAt DESC")
    List<Project> findFeaturedProjects();
    
    /**
     * Lấy Projects theo status
     */
    @Query("SELECT p FROM Project p WHERE p.status = :status ORDER BY p.createdAt DESC")
    List<Project> findByStatus(@Param("status") String status);
    
    /**
     * Tăng view count cho project
     */
    @Modifying
    @Transactional
    @Query("UPDATE Project p SET p.viewCount = p.viewCount + 1 WHERE p.projectId = :projectId")
    void incrementViewCount(@Param("projectId") UUID projectId);
    
    /**
     * Lấy Projects theo status và category
     */
    @Query("SELECT p FROM Project p WHERE p.status = :status AND p.category.categoryId = :categoryId ORDER BY p.sortOrder, p.createdAt DESC")
    List<Project> findByStatusAndCategoryId(@Param("status") String status, @Param("categoryId") UUID categoryId);
    
    /**
     * Tìm kiếm Projects công khai theo keyword
     */
    @Query("SELECT p FROM Project p WHERE p.status = 'published' AND p.isPublic = true AND " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.metaTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.metaDescription) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY p.sortOrder, p.createdAt DESC")
    List<Project> searchPublicProjects(@Param("keyword") String keyword);
    
    /**
     * Lấy Projects mới nhất (published)
     */
    @Query("SELECT p FROM Project p WHERE p.status = 'published' AND p.isPublic = true " +
           "ORDER BY p.publishedAt DESC, p.createdAt DESC")
    List<Project> findLatestPublishedProjects();
    
    /**
     * Lấy Projects có view count cao nhất
     */
    @Query("SELECT p FROM Project p WHERE p.status = 'published' AND p.isPublic = true " +
           "ORDER BY p.viewCount DESC, p.createdAt DESC")
    List<Project> findMostViewedProjects();
}
