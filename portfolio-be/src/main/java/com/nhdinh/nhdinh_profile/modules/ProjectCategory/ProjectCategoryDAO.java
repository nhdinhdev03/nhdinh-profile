package com.nhdinh.nhdinh_profile.modules.ProjectCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectCategoryDAO extends JpaRepository<ProjectCategory, UUID> {
    
    /**
     * Lấy category theo tên
     */
    @Query("SELECT pc FROM ProjectCategory pc WHERE pc.name = :name")
    Optional<ProjectCategory> findByName(@Param("name") String name);
    
    /**
     * Kiểm tra category có tồn tại không
     */
    @Query("SELECT COUNT(pc) > 0 FROM ProjectCategory pc WHERE pc.name = :name")
    boolean existsByName(@Param("name") String name);
    
    /**
     * Lấy tất cả categories có projects
     */
    @Query("SELECT DISTINCT pc FROM ProjectCategory pc JOIN pc.projects p WHERE p.isDeleted = false ORDER BY pc.name")
    List<ProjectCategory> findCategoriesWithActiveProjects();
    
    /**
     * Lấy categories với số lượng projects
     */
    @Query("SELECT pc, COUNT(p) as projectCount FROM ProjectCategory pc LEFT JOIN pc.projects p " +
           "WHERE p.isDeleted = false OR p IS NULL GROUP BY pc ORDER BY pc.name")
    List<Object[]> findCategoriesWithProjectCount();
}