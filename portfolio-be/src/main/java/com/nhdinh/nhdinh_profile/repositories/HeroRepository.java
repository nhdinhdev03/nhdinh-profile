package com.nhdinh.nhdinh_profile.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhdinh.nhdinh_profile.modules.Hero.Hero;

/**
 * JpaRepository interface for Hero entity
 * Provides basic CRUD operations and custom queries
 */
@Repository
public interface HeroRepository extends JpaRepository<Hero, UUID> {
    
    /**
     * Lấy tất cả Hero chưa bị xóa
     */
    @Query("SELECT h FROM Hero h WHERE h.isDeleted = false ORDER BY h.createdAt DESC")
    List<Hero> findAllActive();
    
    /**
     * Lấy Hero đầu tiên chưa bị xóa với translations
     */
    @Query("SELECT h FROM Hero h LEFT JOIN FETCH h.translations t LEFT JOIN FETCH h.subHeadings s " +
           "WHERE h.isDeleted = false ORDER BY h.createdAt DESC")
    Optional<Hero> findFirstActiveWithTranslations();
    
    /**
     * Lấy Hero theo ID với translations và subheadings
     */
    @Query("SELECT h FROM Hero h LEFT JOIN FETCH h.translations t LEFT JOIN FETCH h.subHeadings s " +
           "WHERE h.heroId = :heroId AND h.isDeleted = false")
    Optional<Hero> findByIdWithTranslations(@Param("heroId") UUID heroId);
    
    /**
     * Soft delete Hero
     */
    @Modifying
    @Query("UPDATE Hero h SET h.isDeleted = true WHERE h.heroId = :heroId")
    void softDeleteById(@Param("heroId") UUID heroId);
    
    /**
     * Lấy Hero theo translation language
     */
    @Query("SELECT DISTINCT h FROM Hero h LEFT JOIN FETCH h.translations t " +
           "WHERE h.isDeleted = false AND t.languageCode = :languageCode " +
           "ORDER BY h.createdAt DESC")
    List<Hero> findByLanguageCode(@Param("languageCode") String languageCode);
}