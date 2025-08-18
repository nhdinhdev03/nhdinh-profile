package com.nhdinh.profile.modules.BlogPost;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogPostDAO extends JpaRepository<BlogPost, UUID> {
    
    // Find by slug (unique identifier for URLs)
    Optional<BlogPost> findBySlugAndIsDeletedFalse(String slug);
    
    // Find all active blog posts (not deleted)
    List<BlogPost> findByIsDeletedFalseOrderByCreatedAtDesc();
    
    // Find by title containing keyword (case insensitive)
    @Query("SELECT bp FROM BlogPost bp WHERE LOWER(bp.title) LIKE LOWER(CONCAT('%', :keyword, '%')) AND bp.isDeleted = false ORDER BY bp.createdAt DESC")
    List<BlogPost> findByTitleContainingIgnoreCaseAndIsDeletedFalse(@Param("keyword") String keyword);
    
    // Search in title, description, and content
    @Query("SELECT bp FROM BlogPost bp WHERE " +
           "(LOWER(bp.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(bp.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(bp.content) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND bp.isDeleted = false ORDER BY bp.createdAt DESC")
    List<BlogPost> searchByKeywordAndIsDeletedFalse(@Param("keyword") String keyword);
    
    // Find recent blog posts (limit to specified count)
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false ORDER BY bp.createdAt DESC")
    List<BlogPost> findRecentBlogPosts();
    
    // Count active blog posts
    long countByIsDeletedFalse();
    
    // Find all blog posts including deleted ones (for admin)
    List<BlogPost> findAllByOrderByCreatedAtDesc();
    
    // Find deleted blog posts (for admin recovery)
    List<BlogPost> findByIsDeletedTrueOrderByCreatedAtDesc();
    
    // Check if slug exists (for validation)
    boolean existsBySlugAndIsDeletedFalse(String slug);
    
    // Custom query to find blog posts with pagination-like functionality
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false ORDER BY bp.createdAt DESC")
    List<BlogPost> findLatestBlogPosts();
    
    // Find blog posts by year
    @Query("SELECT bp FROM BlogPost bp WHERE YEAR(bp.createdAt) = :year AND bp.isDeleted = false ORDER BY bp.createdAt DESC")
    List<BlogPost> findByCreatedAtYearAndIsDeletedFalse(@Param("year") int year);
    
    // Find blog posts by month and year
    @Query("SELECT bp FROM BlogPost bp WHERE YEAR(bp.createdAt) = :year AND MONTH(bp.createdAt) = :month AND bp.isDeleted = false ORDER BY bp.createdAt DESC")
    List<BlogPost> findByCreatedAtYearAndMonthAndIsDeletedFalse(@Param("year") int year, @Param("month") int month);
}
