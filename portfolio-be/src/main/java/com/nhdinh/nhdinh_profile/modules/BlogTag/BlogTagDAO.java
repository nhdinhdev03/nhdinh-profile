package com.nhdinh.nhdinh_profile.modules.BlogTag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for BlogTag entity
 */
@Repository
public interface BlogTagDAO extends JpaRepository<BlogTag, UUID> {
    
    /**
     * Tìm tag theo tên
     */
    @Query("SELECT bt FROM BlogTag bt WHERE bt.name = :name")
    Optional<BlogTag> findByName(@Param("name") String name);
    
    /**
     * Kiểm tra tag có tồn tại theo tên
     */
    @Query("SELECT COUNT(bt) > 0 FROM BlogTag bt WHERE bt.name = :name")
    boolean existsByName(@Param("name") String name);
    
    /**
     * Lấy tất cả tags active
     */
    @Query("SELECT bt FROM BlogTag bt WHERE bt.isActive = true ORDER BY bt.name ASC")
    List<BlogTag> findAllActive();
    
    /**
     * Lấy tags có blog posts
     */
    @Query("SELECT DISTINCT bt FROM BlogTag bt INNER JOIN bt.blogMaps bm INNER JOIN bm.blogPost bp " +
           "WHERE bt.isActive = true AND bp.isDeleted = false ORDER BY bt.name ASC")
    List<BlogTag> findTagsWithActiveBlogPosts();
    
    /**
     * Đếm số blog posts sử dụng tag
     */
    @Query("SELECT COUNT(bm) FROM BlogTagMap bm WHERE bm.tag.tagId = :tagId AND bm.blogPost.isDeleted = false")
    Long countBlogPostsUsingTag(@Param("tagId") UUID tagId);
    
    /**
     * Tìm kiếm tags theo tên
     */
    @Query("SELECT bt FROM BlogTag bt WHERE bt.isActive = true AND LOWER(bt.name) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY bt.name ASC")
    List<BlogTag> searchByName(@Param("keyword") String keyword);
}


