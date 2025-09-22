package com.nhdinh.nhdinh_profile.modules.BlogTagMap;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for BlogTagMap entity
 */
@Repository
public interface BlogTagMapDAO extends JpaRepository<BlogTagMap, BlogTagMapId> {
    
    /**
     * Lấy tất cả tag maps của một blog post
     */
    @Query("SELECT btm FROM BlogTagMap btm WHERE btm.blogPost.blogId = :blogId ORDER BY btm.createdAt DESC")
    List<BlogTagMap> findByBlogId(@Param("blogId") UUID blogId);
    
    /**
     * Lấy tất cả tag maps của một tag
     */
    @Query("SELECT btm FROM BlogTagMap btm WHERE btm.tag.tagId = :tagId ORDER BY btm.createdAt DESC")
    List<BlogTagMap> findByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Kiểm tra mapping có tồn tại
     */
    @Query("SELECT COUNT(btm) > 0 FROM BlogTagMap btm WHERE btm.blogPost.blogId = :blogId AND btm.tag.tagId = :tagId")
    boolean existsByBlogIdAndTagId(@Param("blogId") UUID blogId, @Param("tagId") UUID tagId);
    
    /**
     * Xóa tất cả mappings của một blog post
     */
    @Modifying
    @Query("DELETE FROM BlogTagMap btm WHERE btm.blogPost.blogId = :blogId")
    void deleteByBlogId(@Param("blogId") UUID blogId);
    
    /**
     * Xóa tất cả mappings của một tag
     */
    @Modifying
    @Query("DELETE FROM BlogTagMap btm WHERE btm.tag.tagId = :tagId")
    void deleteByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Đếm số mappings của tag
     */
    @Query("SELECT COUNT(btm) FROM BlogTagMap btm WHERE btm.tag.tagId = :tagId")
    Long countByTagId(@Param("tagId") UUID tagId);
}


