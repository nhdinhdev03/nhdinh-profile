package com.nhdinh.profile.repository;

import com.nhdinh.profile.model.BlogCategory;
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
public interface BlogCategoryRepository extends JpaRepository<BlogCategory, UUID> {
    
    @Query("SELECT bc FROM BlogCategory bc WHERE bc.isDeleted = false")
    Page<BlogCategory> findAllActive(Pageable pageable);
    
    @Query("SELECT bc FROM BlogCategory bc WHERE bc.isDeleted = false AND bc.id = :id")
    Optional<BlogCategory> findByIdActive(@Param("id") UUID id);
    
    @Query("SELECT bc FROM BlogCategory bc WHERE bc.isDeleted = false AND bc.slug = :slug")
    Optional<BlogCategory> findBySlug(@Param("slug") String slug);
    
    @Query("SELECT bc FROM BlogCategory bc WHERE bc.isDeleted = false AND bc.enabled = true ORDER BY bc.sortOrder ASC")
    List<BlogCategory> findAllEnabled();
    
    @Query("SELECT bc FROM BlogCategory bc WHERE bc.isDeleted = false AND bc.parent IS NULL ORDER BY bc.sortOrder ASC")
    List<BlogCategory> findRootCategories();
    
    @Query("SELECT bc FROM BlogCategory bc WHERE bc.isDeleted = false AND bc.parent.id = :parentId ORDER BY bc.sortOrder ASC")
    List<BlogCategory> findByParentId(@Param("parentId") UUID parentId);
    
    @Query("SELECT CASE WHEN COUNT(bc) > 0 THEN true ELSE false END FROM BlogCategory bc WHERE bc.isDeleted = false AND bc.slug = :slug")
    boolean existsBySlug(@Param("slug") String slug);
}
