package com.nhdinh.profile.modules.Experience;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceDAO extends JpaRepository<Experience, UUID> {
    
    /**
     * Tìm tất cả Experience theo ProfileId sắp xếp theo SortOrder
     */
    @Query("SELECT e FROM Experience e WHERE e.profileId = :profileId ORDER BY e.sortOrder")
    List<Experience> findByProfileIdOrderBySortOrder(@Param("profileId") UUID profileId);
    
    /**
     * Tìm tất cả Experience theo ProfileId sắp xếp theo StartYear (mới nhất trước)
     */
    @Query("SELECT e FROM Experience e WHERE e.profileId = :profileId ORDER BY e.startYear DESC")
    List<Experience> findByProfileIdOrderByStartYearDesc(@Param("profileId") UUID profileId);
    
    /**
     * Tìm Experience hiện tại (IsCurrent = true) của một Profile
     */
    @Query("SELECT e FROM Experience e WHERE e.profileId = :profileId AND e.isCurrent = true ORDER BY e.sortOrder")
    List<Experience> findCurrentExperiencesByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Tìm Experience theo Company
     */
    @Query("SELECT e FROM Experience e WHERE LOWER(e.company) = LOWER(:company) ORDER BY e.startYear DESC")
    List<Experience> findByCompanyIgnoreCase(@Param("company") String company);
    
    /**
     * Tìm Experience theo Position
     */
    @Query("SELECT e FROM Experience e WHERE LOWER(e.position) = LOWER(:position) ORDER BY e.startYear DESC")
    List<Experience> findByPositionIgnoreCase(@Param("position") String position);
    
    /**
     * Tìm kiếm Experience theo từ khóa trong Position hoặc Company
     */
    @Query("SELECT e FROM Experience e WHERE " +
           "LOWER(e.position) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.company) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "ORDER BY e.startYear DESC")
    List<Experience> searchByKeyword(@Param("keyword") String keyword);
    
    /**
     * Tìm kiếm Experience theo từ khóa trong Description
     */
    @Query("SELECT e FROM Experience e WHERE LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY e.startYear DESC")
    List<Experience> searchByDescriptionKeyword(@Param("keyword") String keyword);
    
    /**
     * Tìm Experience theo khoảng thời gian
     */
    @Query("SELECT e FROM Experience e WHERE e.startYear >= :fromYear AND (e.endYear <= :toYear OR e.endYear IS NULL) ORDER BY e.startYear DESC")
    List<Experience> findByYearRange(@Param("fromYear") int fromYear, @Param("toYear") int toYear);
    
    /**
     * Lấy SortOrder cao nhất của một Profile
     */
    @Query("SELECT COALESCE(MAX(e.sortOrder), 0) FROM Experience e WHERE e.profileId = :profileId")
    int getMaxSortOrderByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Đếm số lượng Experience của một Profile
     */
    @Query("SELECT COUNT(e) FROM Experience e WHERE e.profileId = :profileId")
    long countByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Đếm số lượng Experience hiện tại của một Profile
     */
    @Query("SELECT COUNT(e) FROM Experience e WHERE e.profileId = :profileId AND e.isCurrent = true")
    long countCurrentExperiencesByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Xóa tất cả Experience của một Profile
     */
    @Query("DELETE FROM Experience e WHERE e.profileId = :profileId")
    void deleteByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Lấy những Company phổ biến nhất
     */
    @Query("SELECT e.company, COUNT(e) as cnt FROM Experience e WHERE e.company IS NOT NULL GROUP BY e.company ORDER BY cnt DESC")
    List<Object[]> findMostPopularCompanies();
    
    /**
     * Lấy những Position phổ biến nhất
     */
    @Query("SELECT e.position, COUNT(e) as cnt FROM Experience e WHERE e.position IS NOT NULL GROUP BY e.position ORDER BY cnt DESC")
    List<Object[]> findMostPopularPositions();
}
