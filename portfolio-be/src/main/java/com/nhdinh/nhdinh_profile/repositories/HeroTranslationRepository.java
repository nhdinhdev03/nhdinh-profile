package com.nhdinh.nhdinh_profile.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhdinh.nhdinh_profile.modules.HeroTranslation.HeroTranslation;

/**
 * JpaRepository interface for HeroTranslation entity
 */
@Repository
public interface HeroTranslationRepository extends JpaRepository<HeroTranslation, UUID> {
    
    /**
     * Lấy tất cả translations của một Hero
     */
    @Query("SELECT ht FROM HeroTranslation ht WHERE ht.hero.heroId = :heroId ORDER BY ht.languageCode")
    List<HeroTranslation> findByHeroId(@Param("heroId") UUID heroId);
    
    /**
     * Lấy translation theo Hero và language code
     */
    @Query("SELECT ht FROM HeroTranslation ht WHERE ht.hero.heroId = :heroId AND ht.languageCode = :languageCode")
    Optional<HeroTranslation> findByHeroIdAndLanguageCode(@Param("heroId") UUID heroId, @Param("languageCode") String languageCode);
    
    /**
     * Kiểm tra translation có tồn tại
     */
    @Query("SELECT COUNT(ht) > 0 FROM HeroTranslation ht WHERE ht.hero.heroId = :heroId AND ht.languageCode = :languageCode")
    boolean existsByHeroIdAndLanguageCode(@Param("heroId") UUID heroId, @Param("languageCode") String languageCode);
    
    /**
     * Lấy tất cả language codes của một Hero
     */
    @Query("SELECT DISTINCT ht.languageCode FROM HeroTranslation ht WHERE ht.hero.heroId = :heroId ORDER BY ht.languageCode")
    List<String> findLanguageCodesByHeroId(@Param("heroId") UUID heroId);
}