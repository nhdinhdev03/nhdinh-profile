package com.nhdinh.profile.repository;

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
public interface ProjectCategoryRepository extends JpaRepository<ProjectCategory, UUID> {
    
    @Query("SELECT pc FROM ProjectCategory pc WHERE pc.isDeleted = false")
    Page<ProjectCategory> findAllActive(Pageable pageable);
    
    @Query("SELECT pc FROM ProjectCategory pc WHERE pc.isDeleted = false AND pc.id = :id")
    Optional<ProjectCategory> findByIdActive(@Param("id") UUID id);
    
    @Query("SELECT pc FROM ProjectCategory pc WHERE pc.isDeleted = false AND pc.slug = :slug")
    Optional<ProjectCategory> findBySlug(@Param("slug") String slug);
    
    @Query("SELECT pc FROM ProjectCategory pc WHERE pc.isDeleted = false AND pc.enabled = true ORDER BY pc.sortOrder ASC")
    List<ProjectCategory> findAllEnabled();
    
    @Query("SELECT CASE WHEN COUNT(pc) > 0 THEN true ELSE false END FROM ProjectCategory pc WHERE pc.isDeleted = false AND pc.slug = :slug")
    boolean existsBySlug(@Param("slug") String slug);
}
