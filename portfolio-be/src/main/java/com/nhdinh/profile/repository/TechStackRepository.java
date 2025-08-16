package com.nhdinh.profile.repository;

import com.nhdinh.profile.model.TechStack;
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
public interface TechStackRepository extends JpaRepository<TechStack, UUID> {
    
    @Query("SELECT ts FROM TechStack ts WHERE ts.isDeleted = false")
    Page<TechStack> findAllActive(Pageable pageable);
    
    @Query("SELECT ts FROM TechStack ts WHERE ts.isDeleted = false AND ts.id = :id")
    Optional<TechStack> findByIdActive(@Param("id") UUID id);
    
    @Query("SELECT ts FROM TechStack ts WHERE ts.isDeleted = false AND ts.slug = :slug")
    Optional<TechStack> findBySlug(@Param("slug") String slug);
    
    @Query("SELECT ts FROM TechStack ts WHERE ts.isDeleted = false AND ts.name = :name")
    Optional<TechStack> findByName(@Param("name") String name);
    
    @Query("SELECT ts FROM TechStack ts WHERE ts.isDeleted = false AND ts.category = :category ORDER BY ts.createdAt DESC")
    List<TechStack> findByCategory(@Param("category") String category);
}
