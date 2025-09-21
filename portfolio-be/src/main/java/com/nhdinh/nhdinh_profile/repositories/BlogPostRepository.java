package com.nhdinh.nhdinh_profile.repositories;

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

import com.nhdinh.nhdinh_profile.modules.BlogPost.BlogPost;

/**
 * JpaRepository interface for BlogPost entity
 */
@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {
    
    /**
     * Lấy tất cả blog posts active
     */
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false ORDER BY bp.createdAt DESC")
    List<BlogPost> findAllActive();
    
    /**
     * Lấy blog post theo slug
     */
    @Query("SELECT bp FROM BlogPost bp WHERE bp.slug = :slug AND bp.isDeleted = false")
    Optional<BlogPost> findBySlug(@Param("slug") String slug);
    
    /**
     * Kiểm tra slug có tồn tại
     */
    @Query("SELECT COUNT(bp) > 0 FROM BlogPost bp WHERE bp.slug = :slug AND bp.isDeleted = false")
    boolean existsBySlug(@Param("slug") String slug);
    
    /**
     * Lấy blog posts với translations và tags
     */
    @Query("SELECT bp FROM BlogPost bp LEFT JOIN FETCH bp.translations LEFT JOIN FETCH bp.tagMaps tm LEFT JOIN FETCH tm.tag " +
           "WHERE bp.blogId = :blogId AND bp.isDeleted = false")
    Optional<BlogPost> findByIdWithTranslationsAndTags(@Param("blogId") UUID blogId);
    
    /**
     * Lấy blog posts với phân trang
     */
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false ORDER BY bp.createdAt DESC")
    Page<BlogPost> findAllActiveWithPagination(Pageable pageable);
    
    /**
     * Soft delete blog post
     */
    @Modifying
    @Query("UPDATE BlogPost bp SET bp.isDeleted = true WHERE bp.blogId = :blogId")
    void softDeleteById(@Param("blogId") UUID blogId);
    
    /**
     * Tìm kiếm posts theo slug pattern
     */
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false AND LOWER(bp.slug) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY bp.createdAt DESC")
    List<BlogPost> searchBySlug(@Param("keyword") String keyword);
}