package com.nhdinh.nhdinh_profile.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhdinh.nhdinh_profile.modules.ProjectTranslation.ProjectTranslation;

/**
 * JpaRepository interface for ProjectTranslation entity
 */
@Repository
public interface ProjectTranslationRepository extends JpaRepository<ProjectTranslation, UUID> {

    /**
     * Lấy tất cả translations của một Project
     */
    @Query("SELECT pt FROM ProjectTranslation pt WHERE pt.project.projectId = :projectId ORDER BY pt.languageCode")
    List<ProjectTranslation> findByProjectId(@Param("projectId") UUID projectId);

    /**
     * Lấy translation theo Project và language code
     */
    @Query("SELECT pt FROM ProjectTranslation pt WHERE pt.project.projectId = :projectId AND pt.languageCode = :languageCode")
    Optional<ProjectTranslation> findByProjectIdAndLanguageCode(@Param("projectId") UUID projectId,
            @Param("languageCode") String languageCode);

    /**
     * Kiểm tra translation có tồn tại
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProjectTranslation pt WHERE pt.project.projectId = :projectId AND pt.languageCode = :languageCode")
    boolean existsByProjectIdAndLanguageCode(@Param("projectId") UUID projectId,
            @Param("languageCode") String languageCode);

    /**
     * Lấy tất cả language codes của một Project
     */
    @Query("SELECT DISTINCT pt.languageCode FROM ProjectTranslation pt WHERE pt.project.projectId = :projectId ORDER BY pt.languageCode")
    List<String> findLanguageCodesByProjectId(@Param("projectId") UUID projectId);

    /**
     * Tìm kiếm translations theo title
     */
    @Query("SELECT pt FROM ProjectTranslation pt WHERE pt.project.isDeleted = false AND " +
            "pt.project.isPublic = true AND LOWER(pt.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "ORDER BY pt.createdAt DESC")
    List<ProjectTranslation> searchByTitle(@Param("keyword") String keyword);
}