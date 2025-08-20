package com.nhdinh.profile.modules.BlogTag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogTagDAO extends JpaRepository<BlogTag, UUID> {
    
    // Find by name (case insensitive)
    Optional<BlogTag> findByNameIgnoreCase(String name);
    
    // Find by exact name
    Optional<BlogTag> findByName(String name);
    
    // Check if tag exists by name (case insensitive)
    boolean existsByNameIgnoreCase(String name);
    
    // Search tags by name containing keyword (case insensitive)
    @Query("SELECT bt FROM BlogTag bt WHERE LOWER(bt.name) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY bt.name ASC")
    List<BlogTag> findByNameContainingIgnoreCase(@Param("keyword") String keyword);
    
    // Get all tags ordered by name
    List<BlogTag> findAllByOrderByNameAsc();
    
    // Get tags that start with specific letter/prefix (case insensitive)
    @Query("SELECT bt FROM BlogTag bt WHERE LOWER(bt.name) LIKE LOWER(CONCAT(:prefix, '%')) ORDER BY bt.name ASC")
    List<BlogTag> findByNameStartingWithIgnoreCase(@Param("prefix") String prefix);
    
    // Get popular blog tags (most used in blog posts)
    @Query("SELECT bt FROM BlogTag bt " +
           "JOIN BlogTagMap btm ON bt.tagId = btm.tagId " +
           "JOIN BlogPost bp ON btm.blogId = bp.blogId " +
           "WHERE bp.isDeleted = false " +
           "GROUP BY bt.tagId, bt.name " +
           "ORDER BY COUNT(bp.blogId) DESC, bt.name ASC")
    List<BlogTag> findPopularTags();
    
    // Get popular blog tags with limit
    @Query("SELECT bt FROM BlogTag bt " +
           "JOIN BlogTagMap btm ON bt.tagId = btm.tagId " +
           "JOIN BlogPost bp ON btm.blogId = bp.blogId " +
           "WHERE bp.isDeleted = false " +
           "GROUP BY bt.tagId, bt.name " +
           "ORDER BY COUNT(bp.blogId) DESC, bt.name ASC")
    List<BlogTag> findTopPopularTags();
    
    // Get tags with usage count
    @Query("SELECT bt, COUNT(bp.blogId) as usageCount FROM BlogTag bt " +
           "LEFT JOIN BlogTagMap btm ON bt.tagId = btm.tagId " +
           "LEFT JOIN BlogPost bp ON btm.blogId = bp.blogId AND bp.isDeleted = false " +
           "GROUP BY bt.tagId, bt.name " +
           "ORDER BY usageCount DESC, bt.name ASC")
    List<Object[]> findTagsWithUsageCount();
    
    // Get unused tags (not assigned to any blog post)
    @Query("SELECT bt FROM BlogTag bt " +
           "WHERE bt.tagId NOT IN (" +
           "    SELECT DISTINCT btm.tagId FROM BlogTagMap btm " +
           "    JOIN BlogPost bp ON btm.blogId = bp.blogId " +
           "    WHERE bp.isDeleted = false" +
           ") ORDER BY bt.name ASC")
    List<BlogTag> findUnusedTags();
    
    // Get tags used in specific blog post
    @Query("SELECT bt FROM BlogTag bt " +
           "JOIN BlogTagMap btm ON bt.tagId = btm.tagId " +
           "WHERE btm.blogId = :blogId " +
           "ORDER BY bt.name ASC")
    List<BlogTag> findTagsByBlogId(@Param("blogId") UUID blogId);
    
    // Count blog posts for a specific tag
    @Query("SELECT COUNT(DISTINCT bp.blogId) FROM BlogPost bp " +
           "JOIN BlogTagMap btm ON bp.blogId = btm.blogId " +
           "WHERE btm.tagId = :tagId AND bp.isDeleted = false")
    long countBlogPostsByTagId(@Param("tagId") UUID tagId);
}
