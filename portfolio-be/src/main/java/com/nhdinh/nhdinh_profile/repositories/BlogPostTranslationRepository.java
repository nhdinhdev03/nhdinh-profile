package com.nhdinh.nhdinh_profile.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhdinh.nhdinh_profile.modules.BlogPost.BlogPostTranslation;

/**
 * JpaRepository interface for BlogPostTranslation entity
 */
@Repository
public interface BlogPostTranslationRepository extends JpaRepository<BlogPostTranslation, UUID> {
    
    /**
     * Lấy tất cả translations của một BlogPost
     */
    @Query("SELECT bpt FROM BlogPostTranslation bpt WHERE bpt.blogPost.blogId = :blogId ORDER BY bpt.languageCode")
    List<BlogPostTranslation> findByBlogId(@Param("blogId") UUID blogId);
    
    /**
     * Lấy translation theo BlogPost và language code
     */
    @Query("SELECT bpt FROM BlogPostTranslation bpt WHERE bpt.blogPost.blogId = :blogId AND bpt.languageCode = :languageCode")
    Optional<BlogPostTranslation> findByBlogIdAndLanguageCode(@Param("blogId") UUID blogId, @Param("languageCode") String languageCode);
    
    /**
     * Kiểm tra translation có tồn tại
     */
    @Query("SELECT COUNT(bpt) > 0 FROM BlogPostTranslation bpt WHERE bpt.blogPost.blogId = :blogId AND bpt.languageCode = :languageCode")
    boolean existsByBlogIdAndLanguageCode(@Param("blogId") UUID blogId, @Param("languageCode") String languageCode);
    
    /**
     * Lấy tất cả language codes của một BlogPost
     */
    @Query("SELECT DISTINCT bpt.languageCode FROM BlogPostTranslation bpt WHERE bpt.blogPost.blogId = :blogId ORDER BY bpt.languageCode")
    List<String> findLanguageCodesByBlogId(@Param("blogId") UUID blogId);
    
    /**
     * Tìm kiếm translations theo title hoặc content
     */
    @Query("SELECT bpt FROM BlogPostTranslation bpt WHERE bpt.blogPost.isDeleted = false AND " +
           "(LOWER(bpt.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(bpt.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(bpt.content) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY bpt.createdAt DESC")
    List<BlogPostTranslation> searchByContent(@Param("keyword") String keyword);
}