package com.nhdinh.profile.repository;

import com.nhdinh.profile.model.BlogPost;
import com.nhdinh.profile.model.BlogCategory;
import com.nhdinh.profile.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false")
    Page<BlogPost> findAllActive(Pageable pageable);
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false AND bp.id = :id")
    Optional<BlogPost> findByIdActive(@Param("id") UUID id);
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false AND bp.slug = :slug")
    Optional<BlogPost> findBySlug(@Param("slug") String slug);
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false AND bp.status = :status ORDER BY bp.publishedAt DESC")
    Page<BlogPost> findByStatus(@Param("status") Integer status, Pageable pageable);
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false AND bp.status = 1 ORDER BY bp.publishedAt DESC")
    Page<BlogPost> findPublishedPosts(Pageable pageable);
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false AND bp.featured = true AND bp.status = 1 ORDER BY bp.publishedAt DESC")
    List<BlogPost> findFeaturedPosts();
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false AND bp.author = :author ORDER BY bp.createdAt DESC")
    Page<BlogPost> findByAuthor(@Param("author") User author, Pageable pageable);
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false AND bp.category = :category AND bp.status = 1 ORDER BY bp.publishedAt DESC")
    Page<BlogPost> findByCategory(@Param("category") BlogCategory category, Pageable pageable);
    
    @Query("SELECT bp FROM BlogPost bp JOIN bp.tags t WHERE bp.isDeleted = false AND t.slug = :tagSlug AND bp.status = 1 ORDER BY bp.publishedAt DESC")
    Page<BlogPost> findByTagSlug(@Param("tagSlug") String tagSlug, Pageable pageable);
    
    @Query("SELECT bp FROM BlogPost bp WHERE bp.isDeleted = false AND bp.status = 1 AND (bp.title LIKE %:keyword% OR bp.summary LIKE %:keyword% OR bp.content LIKE %:keyword%) ORDER BY bp.publishedAt DESC")
    Page<BlogPost> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT CASE WHEN COUNT(bp) > 0 THEN true ELSE false END FROM BlogPost bp WHERE bp.isDeleted = false AND bp.slug = :slug")
    boolean existsBySlug(@Param("slug") String slug);
}
