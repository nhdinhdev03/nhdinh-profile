package com.nhdinh.nhdinh_profile.modules.ProjectTagMap;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTagMapDAO extends JpaRepository<ProjectTagMap, ProjectTagMapId> {
    
    /**
     * Lấy tags theo project
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm WHERE ptm.project.projectId = :projectId ORDER BY ptm.sortOrder ASC")
    List<ProjectTagMap> findByProjectId(@Param("projectId") UUID projectId);
    
    /**
     * Lấy projects theo tag
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm WHERE ptm.tag.tagId = :tagId ORDER BY ptm.sortOrder ASC")
    List<ProjectTagMap> findByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Lấy tags của project với thông tin tag
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm JOIN FETCH ptm.tag WHERE ptm.project.projectId = :projectId ORDER BY ptm.sortOrder ASC")
    List<ProjectTagMap> findByProjectIdWithTags(@Param("projectId") UUID projectId);
    
    /**
     * Lấy projects của tag với thông tin project
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm JOIN FETCH ptm.project p WHERE ptm.tag.tagId = :tagId AND p.isDeleted = false ORDER BY ptm.sortOrder ASC")
    List<ProjectTagMap> findByTagIdWithActiveProjects(@Param("tagId") UUID tagId);
    
    /**
     * Kiểm tra mapping có tồn tại
     */
    @Query("SELECT COUNT(ptm) > 0 FROM ProjectTagMap ptm WHERE ptm.project.projectId = :projectId AND ptm.tag.tagId = :tagId")
    boolean existsByProjectIdAndTagId(@Param("projectId") UUID projectId, @Param("tagId") UUID tagId);
    
    /**
     * Xóa mapping theo project
     */
    @Query("DELETE FROM ProjectTagMap ptm WHERE ptm.project.projectId = :projectId")
    void deleteByProjectId(@Param("projectId") UUID projectId);
    
    /**
     * Xóa mapping theo tag
     */
    @Query("DELETE FROM ProjectTagMap ptm WHERE ptm.tag.tagId = :tagId")
    void deleteByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Lấy sort order lớn nhất cho project
     */
    @Query("SELECT COALESCE(MAX(ptm.sortOrder), 0) FROM ProjectTagMap ptm WHERE ptm.project.projectId = :projectId")
    Integer findMaxSortOrderByProjectId(@Param("projectId") UUID projectId);
}