package com.nhdinh.profile.modules.BlogTagMap;

import com.nhdinh.profile.modules.BlogPost.BlogPost;
import com.nhdinh.profile.modules.BlogTag.BlogTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogTagMapDAO extends JpaRepository<BlogTagMap, BlogTagMapId> {
    
    // Find all tags for a specific blog post
    @Query("SELECT btm FROM BlogTagMap btm WHERE btm.blogId = :blogId")
    List<BlogTagMap> findByBlogId(@Param("blogId") UUID blogId);
    
    // Find all blog posts for a specific tag
    @Query("SELECT btm FROM BlogTagMap btm WHERE btm.tagId = :tagId")
    List<BlogTagMap> findByTagId(@Param("tagId") UUID tagId);
    
    // Find specific mapping
    Optional<BlogTagMap> findByBlogIdAndTagId(UUID blogId, UUID tagId);
    
    // Check if mapping exists
    boolean existsByBlogIdAndTagId(UUID blogId, UUID tagId);
    
    // Get BlogTag entities for a specific blog post
    @Query("SELECT bt FROM BlogTag bt " +
           "JOIN BlogTagMap btm ON bt.tagId = btm.tagId " +
           "WHERE btm.blogId = :blogId " +
           "ORDER BY bt.name ASC")
    List<BlogTag> findTagsByBlogId(@Param("blogId") UUID blogId);
    
    // Get BlogPost entities for a specific tag
    @Query("SELECT bp FROM BlogPost bp " +
           "JOIN BlogTagMap btm ON bp.blogId = btm.blogId " +
           "WHERE btm.tagId = :tagId AND bp.isDeleted = false " +
           "ORDER BY bp.createdAt DESC")
    List<BlogPost> findBlogPostsByTagId(@Param("tagId") UUID tagId);
    
    // Get BlogPost entities for a specific tag by tag name
    @Query("SELECT bp FROM BlogPost bp " +
           "JOIN BlogTagMap btm ON bp.blogId = btm.blogId " +
           "JOIN BlogTag bt ON btm.tagId = bt.tagId " +
           "WHERE LOWER(bt.name) = LOWER(:tagName) AND bp.isDeleted = false " +
           "ORDER BY bp.createdAt DESC")
    List<BlogPost> findBlogPostsByTagName(@Param("tagName") String tagName);
    
    // Count tags for a specific blog post
    @Query("SELECT COUNT(btm) FROM BlogTagMap btm WHERE btm.blogId = :blogId")
    long countTagsByBlogId(@Param("blogId") UUID blogId);
    
    // Count blog posts for a specific tag
    @Query("SELECT COUNT(btm) FROM BlogTagMap btm " +
           "JOIN BlogPost bp ON btm.blogId = bp.blogId " +
           "WHERE btm.tagId = :tagId AND bp.isDeleted = false")
    long countBlogPostsByTagId(@Param("tagId") UUID tagId);
    
    // Delete all mappings for a blog post
    @Modifying
    @Query("DELETE FROM BlogTagMap btm WHERE btm.blogId = :blogId")
    void deleteByBlogId(@Param("blogId") UUID blogId);
    
    // Delete all mappings for a tag
    @Modifying
    @Query("DELETE FROM BlogTagMap btm WHERE btm.tagId = :tagId")
    void deleteByTagId(@Param("tagId") UUID tagId);
    
    // Delete specific mapping
    @Modifying
    @Query("DELETE FROM BlogTagMap btm WHERE btm.blogId = :blogId AND btm.tagId = :tagId")
    void deleteByBlogIdAndTagId(@Param("blogId") UUID blogId, @Param("tagId") UUID tagId);
    
    // Get most popular tags (used in most blog posts)
    @Query("SELECT bt, COUNT(bp.blogId) as usageCount FROM BlogTag bt " +
           "JOIN BlogTagMap btm ON bt.tagId = btm.tagId " +
           "JOIN BlogPost bp ON btm.blogId = bp.blogId " +
           "WHERE bp.isDeleted = false " +
           "GROUP BY bt.tagId, bt.name " +
           "ORDER BY usageCount DESC, bt.name ASC")
    List<Object[]> findMostPopularTags();
    
    // Get blog posts that share tags with a specific blog post (related posts)
    @Query("SELECT DISTINCT bp FROM BlogPost bp " +
           "JOIN BlogTagMap btm1 ON bp.blogId = btm1.blogId " +
           "JOIN BlogTagMap btm2 ON btm1.tagId = btm2.tagId " +
           "WHERE btm2.blogId = :blogId AND bp.blogId != :blogId AND bp.isDeleted = false " +
           "ORDER BY bp.createdAt DESC")
    List<BlogPost> findRelatedBlogPosts(@Param("blogId") UUID blogId);
    
    // Get tags that are commonly used together
    @Query("SELECT bt1, bt2, COUNT(*) as coOccurrence FROM BlogTag bt1 " +
           "JOIN BlogTagMap btm1 ON bt1.tagId = btm1.tagId " +
           "JOIN BlogTagMap btm2 ON btm1.blogId = btm2.blogId " +
           "JOIN BlogTag bt2 ON btm2.tagId = bt2.tagId " +
           "JOIN BlogPost bp ON btm1.blogId = bp.blogId " +
           "WHERE bt1.tagId < bt2.tagId AND bp.isDeleted = false " +
           "GROUP BY bt1.tagId, bt1.name, bt2.tagId, bt2.name " +
           "ORDER BY coOccurrence DESC")
    List<Object[]> findTagCoOccurrences();
    
    // Get tag combinations for a specific blog post count
    @Query("SELECT btm.blogId, COUNT(btm.tagId) as tagCount FROM BlogTagMap btm " +
           "JOIN BlogPost bp ON btm.blogId = bp.blogId " +
           "WHERE bp.isDeleted = false " +
           "GROUP BY btm.blogId " +
           "ORDER BY tagCount DESC")
    List<Object[]> findBlogPostTagCounts();
}
