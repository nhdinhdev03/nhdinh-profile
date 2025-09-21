package com.nhdinh.nhdinh_profile.modules.Hero;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroTranslationDAO extends JpaRepository<HeroTranslation, UUID> {
    
    /**
     * Lấy tất cả translation theo HeroId
     */
    @Query("SELECT ht FROM HeroTranslation ht WHERE ht.hero.heroId = :heroId")
    List<HeroTranslation> findByHeroId(@Param("heroId") UUID heroId);
    
    /**
     * Lấy translation theo HeroId và LanguageCode
     */
    @Query("SELECT ht FROM HeroTranslation ht WHERE ht.hero.heroId = :heroId AND ht.languageCode = :languageCode")
    HeroTranslation findByHeroIdAndLanguageCode(@Param("heroId") UUID heroId, @Param("languageCode") String languageCode);
    
    /**
     * Lấy tất cả translation theo LanguageCode
     */
    @Query("SELECT ht FROM HeroTranslation ht WHERE ht.languageCode = :languageCode")
    List<HeroTranslation> findByLanguageCode(@Param("languageCode") String languageCode);
    
    /**
     * Kiểm tra translation có tồn tại không
     */
    @Query("SELECT COUNT(ht) > 0 FROM HeroTranslation ht WHERE ht.hero.heroId = :heroId AND ht.languageCode = :languageCode")
    boolean existsByHeroIdAndLanguageCode(@Param("heroId") UUID heroId, @Param("languageCode") String languageCode);
}