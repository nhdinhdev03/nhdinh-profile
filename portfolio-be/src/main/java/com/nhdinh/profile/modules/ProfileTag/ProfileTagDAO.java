package com.nhdinh.profile.modules.ProfileTag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileTagDAO extends JpaRepository<ProfileTag, UUID> {
    
    /**
     * Tìm tất cả ProfileTag theo ProfileId
     */
    @Query("SELECT pt FROM ProfileTag pt WHERE pt.profileId = :profileId ORDER BY pt.sortOrder")
    List<ProfileTag> findByProfileIdOrderBySortOrder(@Param("profileId") UUID profileId);
    
    /**
     * Tìm ProfileTag theo ProfileId và Label
     */
    @Query("SELECT pt FROM ProfileTag pt WHERE pt.profileId = :profileId AND pt.label = :label")
    Optional<ProfileTag> findByProfileIdAndLabel(@Param("profileId") UUID profileId, @Param("label") String label);
    
    /**
     * Tìm ProfileTag theo Label (case insensitive)
     */
    @Query("SELECT pt FROM ProfileTag pt WHERE LOWER(pt.label) = LOWER(:label)")
    List<ProfileTag> findByLabelIgnoreCase(@Param("label") String label);
    
    /**
     * Tìm kiếm ProfileTag theo từ khóa trong Label
     */
    @Query("SELECT pt FROM ProfileTag pt WHERE LOWER(pt.label) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY pt.sortOrder")
    List<ProfileTag> searchByLabelKeyword(@Param("keyword") String keyword);
    
    /**
     * Lấy tất cả ProfileTag của một Profile sắp xếp theo SortOrder
     */
    @Query("SELECT pt FROM ProfileTag pt WHERE pt.profileId = :profileId ORDER BY pt.sortOrder, pt.label")
    List<ProfileTag> findByProfileIdOrderBySortOrderAndLabel(@Param("profileId") UUID profileId);
    
    /**
     * Kiểm tra xem Label đã tồn tại trong Profile chưa
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProfileTag pt WHERE pt.profileId = :profileId AND LOWER(pt.label) = LOWER(:label)")
    boolean existsByProfileIdAndLabelIgnoreCase(@Param("profileId") UUID profileId, @Param("label") String label);
    
    /**
     * Kiểm tra xem Label đã tồn tại trong Profile chưa (trừ record hiện tại)
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProfileTag pt WHERE pt.profileId = :profileId AND LOWER(pt.label) = LOWER(:label) AND pt.tagId != :tagId")
    boolean existsByProfileIdAndLabelIgnoreCaseAndNotSelf(@Param("profileId") UUID profileId, @Param("label") String label, @Param("tagId") UUID tagId);
    
    /**
     * Lấy SortOrder cao nhất của một Profile
     */
    @Query("SELECT COALESCE(MAX(pt.sortOrder), 0) FROM ProfileTag pt WHERE pt.profileId = :profileId")
    int getMaxSortOrderByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Đếm số lượng Tag của một Profile
     */
    @Query("SELECT COUNT(pt) FROM ProfileTag pt WHERE pt.profileId = :profileId")
    long countByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Xóa tất cả Tag của một Profile
     */
    @Query("DELETE FROM ProfileTag pt WHERE pt.profileId = :profileId")
    void deleteByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Lấy những Tag phổ biến nhất (được sử dụng nhiều nhất)
     */
    @Query("SELECT pt.label, COUNT(pt) as cnt FROM ProfileTag pt GROUP BY pt.label ORDER BY cnt DESC")
    List<Object[]> findMostUsedTags();
}
