package com.nhdinh.profile.modules.ProjectCategory;

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
     * Tìm ProjectCategory theo tên
     */
    @Query("SELECT pc FROM ProjectCategory pc WHERE pc.name = :name")
    Optional<ProjectCategory> findByName(@Param("name") String name);
    
    /**
     * Tìm ProjectCategory theo tên (case insensitive)
     */
    @Query("SELECT pc FROM ProjectCategory pc WHERE LOWER(pc.name) = LOWER(:name)")
    Optional<ProjectCategory> findByNameIgnoreCase(@Param("name") String name);
    
    /**
     * Kiểm tra xem tên đã tồn tại chưa
     */
    @Query("SELECT COUNT(pc) > 0 FROM ProjectCategory pc WHERE LOWER(pc.name) = LOWER(:name)")
    boolean existsByNameIgnoreCase(@Param("name") String name);
    
    /**
     * Kiểm tra xem tên đã tồn tại chưa (trừ record hiện tại)
     */
    @Query("SELECT COUNT(pc) > 0 FROM ProjectCategory pc WHERE LOWER(pc.name) = LOWER(:name) AND pc.categoryId != :categoryId")
    boolean existsByNameIgnoreCaseAndNotSelf(@Param("name") String name, @Param("categoryId") UUID categoryId);
    
    /**
     * Tìm kiếm ProjectCategory theo tên (partial match)
     */
    @Query("SELECT pc FROM ProjectCategory pc WHERE LOWER(pc.name) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY pc.name")
    List<ProjectCategory> findByNameContainingIgnoreCase(@Param("keyword") String keyword);
    
    /**
     * Lấy tất cả ProjectCategory sắp xếp theo tên
     */
    @Query("SELECT pc FROM ProjectCategory pc ORDER BY pc.name")
    List<ProjectCategory> findAllOrderByName();
}
