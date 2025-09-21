package com.nhdinh.nhdinh_profile.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhdinh.nhdinh_profile.modules.ProjectTagMap.ProjectTagMap;
import com.nhdinh.nhdinh_profile.modules.ProjectTagMap.ProjectTagMapId;

/**
 * JpaRepository interface for ProjectTagMap entity
 */
@Repository
public interface ProjectTagMapRepository extends JpaRepository<ProjectTagMap, ProjectTagMapId> {
    
    /**
     * Lấy tất cả tag maps của một project
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm WHERE ptm.project.projectId = :projectId ORDER BY ptm.sortOrder ASC")
    List<ProjectTagMap> findByProjectId(@Param("projectId") UUID projectId);
    
    /**
     * Lấy tất cả tag maps của một tag
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm WHERE ptm.tag.tagId = :tagId ORDER BY ptm.createdAt DESC")
    List<ProjectTagMap> findByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Kiểm tra mapping có tồn tại
     */
    @Query("SELECT COUNT(ptm) > 0 FROM ProjectTagMap ptm WHERE ptm.project.projectId = :projectId AND ptm.tag.tagId = :tagId")
    boolean existsByProjectIdAndTagId(@Param("projectId") UUID projectId, @Param("tagId") UUID tagId);
    
    /**
     * Lấy max sort order của project
     */
    @Query("SELECT COALESCE(MAX(ptm.sortOrder), 0) FROM ProjectTagMap ptm WHERE ptm.project.projectId = :projectId")
    Integer findMaxSortOrderByProjectId(@Param("projectId") UUID projectId);
    
    /**
     * Xóa tất cả mappings của một project
     */
    @Modifying
    @Query("DELETE FROM ProjectTagMap ptm WHERE ptm.project.projectId = :projectId")
    void deleteByProjectId(@Param("projectId") UUID projectId);
    
    /**
     * Xóa tất cả mappings của một tag
     */
    @Modifying
    @Query("DELETE FROM ProjectTagMap ptm WHERE ptm.tag.tagId = :tagId")
    void deleteByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Đếm số mappings của tag
     */
    @Query("SELECT COUNT(ptm) FROM ProjectTagMap ptm WHERE ptm.tag.tagId = :tagId")
    Long countByTagId(@Param("tagId") UUID tagId);
}