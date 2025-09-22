package com.nhdinh.nhdinh_profile.modules.ProjectCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for ProjectCategory entity
 */
@Repository
public interface ProjectCategoryDAO extends JpaRepository<ProjectCategory, UUID> {
    
    /**
     * Tìm category theo tên
     */
    @Query("SELECT pc FROM ProjectCategory pc WHERE pc.name = :name")
    Optional<ProjectCategory> findByName(@Param("name") String name);
    
    /**
     * Kiểm tra category có tồn tại theo tên
     */
    @Query("SELECT COUNT(pc) > 0 FROM ProjectCategory pc WHERE pc.name = :name")
    boolean existsByName(@Param("name") String name);
    
    /**
     * Lấy tất cả categories có projects
     */
    @Query("SELECT DISTINCT pc FROM ProjectCategory pc INNER JOIN pc.projects p WHERE p.isDeleted = false AND p.isPublic = true")
    List<ProjectCategory> findCategoriesWithPublicProjects();
    
    /**
     * Lấy tất cả categories theo thứ tự tên
     */
    @Query("SELECT pc FROM ProjectCategory pc ORDER BY pc.name ASC")
    List<ProjectCategory> findAllOrderByName();
    
    /**
     * Đếm số projects trong category
     */
    @Query("SELECT COUNT(p) FROM Project p WHERE p.category.categoryId = :categoryId AND p.isDeleted = false AND p.isPublic = true")
    Long countProjectsInCategory(@Param("categoryId") UUID categoryId);
}


