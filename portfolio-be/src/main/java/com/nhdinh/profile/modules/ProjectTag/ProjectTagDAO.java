package com.nhdinh.profile.modules.ProjectTag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTagDAO extends JpaRepository<ProjectTag, UUID> {
    
    /**
     * Tìm ProjectTag theo tên
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.name = :name")
    Optional<ProjectTag> findByName(@Param("name") String name);
    
    /**
     * Tìm ProjectTag theo tên (case insensitive)
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE LOWER(pt.name) = LOWER(:name)")
    Optional<ProjectTag> findByNameIgnoreCase(@Param("name") String name);
    
    /**
     * Kiểm tra xem tên đã tồn tại chưa
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProjectTag pt WHERE LOWER(pt.name) = LOWER(:name)")
    boolean existsByNameIgnoreCase(@Param("name") String name);
    
    /**
     * Kiểm tra xem tên đã tồn tại chưa (trừ record hiện tại)
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProjectTag pt WHERE LOWER(pt.name) = LOWER(:name) AND pt.tagId != :tagId")
    boolean existsByNameIgnoreCaseAndNotSelf(@Param("name") String name, @Param("tagId") UUID tagId);
    
    /**
     * Tìm kiếm ProjectTag theo tên (partial match)
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE LOWER(pt.name) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY pt.name")
    List<ProjectTag> findByNameContainingIgnoreCase(@Param("keyword") String keyword);
    
    /**
     * Lấy tất cả ProjectTag sắp xếp theo tên
     */
    @Query("SELECT pt FROM ProjectTag pt ORDER BY pt.name")
    List<ProjectTag> findAllOrderByName();
    
    /**
     * Tìm tags theo danh sách tên
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.name IN :names")
    List<ProjectTag> findByNameIn(@Param("names") List<String> names);
    
    /**
     * Tìm tags phổ biến nhất (được sử dụng nhiều nhất trong projects)
     */
    @Query("SELECT pt FROM ProjectTag pt WHERE pt.tagId IN " +
           "(SELECT pt2.tagId FROM Project p JOIN p.tags pt2 GROUP BY pt2.tagId ORDER BY COUNT(p) DESC)")
    List<ProjectTag> findMostUsedTags();
}
