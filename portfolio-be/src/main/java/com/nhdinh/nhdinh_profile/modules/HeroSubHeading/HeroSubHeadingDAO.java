package com.nhdinh.nhdinh_profile.modules.HeroSubHeading;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for HeroSubHeading entity
 */
@Repository
public interface HeroSubHeadingDAO extends JpaRepository<HeroSubHeading, UUID> {
    
    /**
     * Lấy tất cả sub headings của một Hero
     */
    @Query("SELECT hsh FROM HeroSubHeading hsh WHERE hsh.hero.heroId = :heroId ORDER BY hsh.sortOrder ASC")
    List<HeroSubHeading> findByHeroId(@Param("heroId") UUID heroId);
    
    /**
     * Lấy sub headings theo Hero và language code
     */
    @Query("SELECT hsh FROM HeroSubHeading hsh WHERE hsh.hero.heroId = :heroId AND hsh.languageCode = :languageCode ORDER BY hsh.sortOrder ASC")
    List<HeroSubHeading> findByHeroIdAndLanguageCode(@Param("heroId") UUID heroId, @Param("languageCode") String languageCode);
    
    /**
     * Lấy sub heading max sort order
     */
    @Query("SELECT COALESCE(MAX(hsh.sortOrder), 0) FROM HeroSubHeading hsh WHERE hsh.hero.heroId = :heroId AND hsh.languageCode = :languageCode")
    Integer findMaxSortOrderByHeroIdAndLanguageCode(@Param("heroId") UUID heroId, @Param("languageCode") String languageCode);
}


