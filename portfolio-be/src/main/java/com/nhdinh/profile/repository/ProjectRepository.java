package com.nhdinh.profile.repository;

import com.nhdinh.profile.model.Project;
import com.nhdinh.profile.model.ProjectCategory;
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
public interface ProjectRepository extends JpaRepository<Project, UUID> {
    
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false")
    Page<Project> findAllActive(Pageable pageable);
    
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.id = :id")
    Optional<Project> findByIdActive(@Param("id") UUID id);
    
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.slug = :slug")
    Optional<Project> findBySlug(@Param("slug") String slug);
    
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.status = :status ORDER BY p.sortOrder ASC, p.createdAt DESC")
    Page<Project> findByStatus(@Param("status") Integer status, Pageable pageable);
    
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.featured = true AND p.status = 1 ORDER BY p.sortOrder ASC")
    List<Project> findFeaturedProjects();
    
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.category = :category AND p.status = 1 ORDER BY p.sortOrder ASC, p.createdAt DESC")
    Page<Project> findByCategory(@Param("category") ProjectCategory category, Pageable pageable);
    
    @Query("SELECT p FROM Project p JOIN p.tags t WHERE p.isDeleted = false AND t.slug = :tagSlug AND p.status = 1")
    Page<Project> findByTagSlug(@Param("tagSlug") String tagSlug, Pageable pageable);
    
    @Query("SELECT p FROM Project p JOIN p.techStacks ts WHERE p.isDeleted = false AND ts.slug = :techSlug AND p.status = 1")
    Page<Project> findByTechStackSlug(@Param("techSlug") String techSlug, Pageable pageable);
    
    @Query("SELECT p FROM Project p WHERE p.isDeleted = false AND p.status = 1 AND (p.title LIKE %:keyword% OR p.shortDescription LIKE %:keyword%)")
    Page<Project> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
