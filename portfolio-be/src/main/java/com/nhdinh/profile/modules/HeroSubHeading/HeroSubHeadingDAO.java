package com.nhdinh.profile.modules.HeroSubHeading;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroSubHeadingDAO extends JpaRepository<HeroSubHeading, UUID> {
    
    /**
     * Tìm tất cả SubHeading theo HeroId và sắp xếp theo SortOrder
     */
    @Query("SELECT hs FROM HeroSubHeading hs WHERE hs.hero.heroId = :heroId ORDER BY hs.sortOrder ASC")
    List<HeroSubHeading> findByHeroIdOrderBySortOrder(@Param("heroId") UUID heroId);
    
    /**
     * Kiểm tra xem text đã tồn tại cho Hero này chưa (trừ record hiện tại)
     */
    @Query("SELECT COUNT(hs) > 0 FROM HeroSubHeading hs " +
           "WHERE hs.hero.heroId = :heroId AND hs.text = :text AND hs.subId != :subId")
    boolean existsByHeroIdAndTextAndNotSelf(@Param("heroId") UUID heroId, 
                                          @Param("text") String text, 
                                          @Param("subId") UUID subId);
    
    /**
     * Kiểm tra xem text đã tồn tại cho Hero này chưa
     */
    @Query("SELECT COUNT(hs) > 0 FROM HeroSubHeading hs " +
           "WHERE hs.hero.heroId = :heroId AND hs.text = :text")
    boolean existsByHeroIdAndText(@Param("heroId") UUID heroId, @Param("text") String text);
    
    /**
     * Lấy SortOrder lớn nhất cho Hero
     */
    @Query("SELECT COALESCE(MAX(hs.sortOrder), 0) FROM HeroSubHeading hs WHERE hs.hero.heroId = :heroId")
    Integer getMaxSortOrderByHeroId(@Param("heroId") UUID heroId);
    
    /**
     * Xóa tất cả SubHeading của Hero
     */
    @Query("DELETE FROM HeroSubHeading hs WHERE hs.hero.heroId = :heroId")
    void deleteByHeroId(@Param("heroId") UUID heroId);
    
    /**
     * Đếm số lượng SubHeading của Hero
     */
    @Query("SELECT COUNT(hs) FROM HeroSubHeading hs WHERE hs.hero.heroId = :heroId")
    long countByHeroId(@Param("heroId") UUID heroId);
}
