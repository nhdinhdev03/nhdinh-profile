package com.nhdinh.nhdinh_profile.modules.Project;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTranslationDAO extends JpaRepository<ProjectTranslation, UUID> {
    
    /**
     * Lấy translations theo project
     */
    @Query("SELECT pt FROM ProjectTranslation pt WHERE pt.project.projectId = :projectId")
    List<ProjectTranslation> findByProjectId(@Param("projectId") UUID projectId);
    
    /**
     * Lấy translation theo project và language
     */
    @Query("SELECT pt FROM ProjectTranslation pt WHERE pt.project.projectId = :projectId AND pt.languageCode = :languageCode")
    ProjectTranslation findByProjectIdAndLanguage(@Param("projectId") UUID projectId, @Param("languageCode") String languageCode);
    
    /**
     * Lấy translations theo language
     */
    @Query("SELECT pt FROM ProjectTranslation pt WHERE pt.languageCode = :languageCode")
    List<ProjectTranslation> findByLanguage(@Param("languageCode") String languageCode);
    
    /**
     * Kiểm tra translation có tồn tại
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProjectTranslation pt WHERE pt.project.projectId = :projectId AND pt.languageCode = :languageCode")
    boolean existsByProjectIdAndLanguage(@Param("projectId") UUID projectId, @Param("languageCode") String languageCode);
    
    /**
     * Search trong translations
     */
    @Query("SELECT pt FROM ProjectTranslation pt WHERE " +
           "(LOWER(pt.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(pt.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND pt.languageCode = :languageCode")
    List<ProjectTranslation> searchByKeywordAndLanguage(@Param("keyword") String keyword, @Param("languageCode") String languageCode);
}