package com.nhdinh.profile.modules.ProjectTagMap;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTagMapDAO extends JpaRepository<ProjectTagMap, ProjectTagMapId> {
    
    /**
     * Tìm tất cả ProjectTagMap theo ProjectId, sắp xếp theo SortOrder
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm WHERE ptm.projectId = :projectId ORDER BY ptm.sortOrder")
    List<ProjectTagMap> findByProjectIdOrderBySortOrder(@Param("projectId") UUID projectId);
    
    /**
     * Tìm tất cả ProjectTagMap theo TagId
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm WHERE ptm.tagId = :tagId ORDER BY ptm.project.createdAt DESC")
    List<ProjectTagMap> findByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Tìm ProjectTagMap theo ProjectId và TagId
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm WHERE ptm.projectId = :projectId AND ptm.tagId = :tagId")
    Optional<ProjectTagMap> findByProjectIdAndTagId(@Param("projectId") UUID projectId, @Param("tagId") UUID tagId);
    
    /**
     * Kiểm tra xem mapping đã tồn tại chưa
     */
    @Query("SELECT COUNT(ptm) > 0 FROM ProjectTagMap ptm WHERE ptm.projectId = :projectId AND ptm.tagId = :tagId")
    boolean existsByProjectIdAndTagId(@Param("projectId") UUID projectId, @Param("tagId") UUID tagId);
    
    /**
     * Đếm số tag của một project
     */
    @Query("SELECT COUNT(ptm) FROM ProjectTagMap ptm WHERE ptm.projectId = :projectId")
    long countByProjectId(@Param("projectId") UUID projectId);
    
    /**
     * Đếm số project sử dụng một tag
     */
    @Query("SELECT COUNT(ptm) FROM ProjectTagMap ptm WHERE ptm.tagId = :tagId")
    long countByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Lấy SortOrder lớn nhất của một project
     */
    @Query("SELECT COALESCE(MAX(ptm.sortOrder), 0) FROM ProjectTagMap ptm WHERE ptm.projectId = :projectId")
    Integer getMaxSortOrderByProjectId(@Param("projectId") UUID projectId);
    
    /**
     * Xóa tất cả mapping của một project
     */
    @Modifying
    @Query("DELETE FROM ProjectTagMap ptm WHERE ptm.projectId = :projectId")
    void deleteByProjectId(@Param("projectId") UUID projectId);
    
    /**
     * Xóa tất cả mapping của một tag
     */
    @Modifying
    @Query("DELETE FROM ProjectTagMap ptm WHERE ptm.tagId = :tagId")
    void deleteByTagId(@Param("tagId") UUID tagId);
    
    /**
     * Xóa mapping cụ thể
     */
    @Modifying
    @Query("DELETE FROM ProjectTagMap ptm WHERE ptm.projectId = :projectId AND ptm.tagId = :tagId")
    void deleteByProjectIdAndTagId(@Param("projectId") UUID projectId, @Param("tagId") UUID tagId);
    
    /**
     * Cập nhật SortOrder
     */
    @Modifying
    @Query("UPDATE ProjectTagMap ptm SET ptm.sortOrder = :sortOrder WHERE ptm.projectId = :projectId AND ptm.tagId = :tagId")
    void updateSortOrder(@Param("projectId") UUID projectId, @Param("tagId") UUID tagId, @Param("sortOrder") Integer sortOrder);
    
    /**
     * Tìm projects có chứa tag cụ thể, sắp xếp theo created date
     */
    @Query("SELECT ptm FROM ProjectTagMap ptm JOIN ptm.project p WHERE ptm.tagId = :tagId ORDER BY p.createdAt DESC")
    List<ProjectTagMap> findProjectsByTagIdOrderByCreatedDate(@Param("tagId") UUID tagId);
    
    /**
     * Tìm các tags phổ biến nhất (được sử dụng nhiều nhất)
     */
    @Query("SELECT ptm.tagId, COUNT(ptm) as usageCount FROM ProjectTagMap ptm GROUP BY ptm.tagId ORDER BY usageCount DESC")
    List<Object[]> findMostUsedTags();
}
