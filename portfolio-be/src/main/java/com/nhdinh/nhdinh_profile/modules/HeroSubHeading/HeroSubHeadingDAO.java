package com.nhdinh.nhdinh_profile.modules.HeroSubHeading;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroSubHeadingDAO extends JpaRepository<HeroSubHeading, UUID> {
    
    /**
     * Lấy tất cả subheading theo HeroId
     */
    @Query("SELECT hsh FROM HeroSubHeading hsh WHERE hsh.hero.heroId = :heroId ORDER BY hsh.sortOrder ASC")
    List<HeroSubHeading> findByHeroId(@Param("heroId") UUID heroId);
    
    /**
     * Lấy subheading theo HeroId và LanguageCode
     */
    @Query("SELECT hsh FROM HeroSubHeading hsh WHERE hsh.hero.heroId = :heroId AND hsh.languageCode = :languageCode ORDER BY hsh.sortOrder ASC")
    List<HeroSubHeading> findByHeroIdAndLanguageCode(@Param("heroId") UUID heroId, @Param("languageCode") String languageCode);
    
    /**
     * Lấy tất cả subheading theo LanguageCode
     */
    @Query("SELECT hsh FROM HeroSubHeading hsh WHERE hsh.languageCode = :languageCode ORDER BY hsh.sortOrder ASC")
    List<HeroSubHeading> findByLanguageCode(@Param("languageCode") String languageCode);
    
    /**
     * Kiểm tra subheading có tồn tại không
     */
    @Query("SELECT COUNT(hsh) > 0 FROM HeroSubHeading hsh WHERE hsh.hero.heroId = :heroId AND hsh.languageCode = :languageCode AND hsh.text = :text")
    boolean existsByHeroIdAndLanguageCodeAndText(@Param("heroId") UUID heroId, @Param("languageCode") String languageCode, @Param("text") String text);
    
    /**
     * Lấy sortOrder lớn nhất cho hero và language
     */
    @Query("SELECT COALESCE(MAX(hsh.sortOrder), 0) FROM HeroSubHeading hsh WHERE hsh.hero.heroId = :heroId AND hsh.languageCode = :languageCode")
    Integer findMaxSortOrderByHeroIdAndLanguageCode(@Param("heroId") UUID heroId, @Param("languageCode") String languageCode);
}