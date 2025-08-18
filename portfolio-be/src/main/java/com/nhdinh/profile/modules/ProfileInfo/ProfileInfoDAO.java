package com.nhdinh.profile.modules.ProfileInfo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileInfoDAO extends JpaRepository<ProfileInfo, UUID> {
    
    /**
     * Tìm ProfileInfo theo FullName
     */
    @Query("SELECT pi FROM ProfileInfo pi WHERE pi.fullName = :fullName")
    Optional<ProfileInfo> findByFullName(@Param("fullName") String fullName);
    
    /**
     * Tìm ProfileInfo theo FullName (case insensitive)
     */
    @Query("SELECT pi FROM ProfileInfo pi WHERE LOWER(pi.fullName) = LOWER(:fullName)")
    Optional<ProfileInfo> findByFullNameIgnoreCase(@Param("fullName") String fullName);
    
    /**
     * Tìm ProfileInfo theo Title
     */
    @Query("SELECT pi FROM ProfileInfo pi WHERE pi.title = :title")
    List<ProfileInfo> findByTitle(@Param("title") String title);
    
    /**
     * Tìm kiếm ProfileInfo theo từ khóa trong FullName hoặc Title
     */
    @Query("SELECT pi FROM ProfileInfo pi WHERE " +
           "LOWER(pi.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(pi.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ProfileInfo> searchByKeyword(@Param("keyword") String keyword);
    
    /**
     * Tìm kiếm ProfileInfo theo từ khóa trong Bio
     */
    @Query("SELECT pi FROM ProfileInfo pi WHERE LOWER(pi.bio) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ProfileInfo> searchByBioKeyword(@Param("keyword") String keyword);
    
    /**
     * Lấy tất cả ProfileInfo sắp xếp theo ngày tạo (mới nhất trước)
     */
    @Query("SELECT pi FROM ProfileInfo pi ORDER BY pi.createdAt DESC")
    List<ProfileInfo> findAllOrderByCreatedAtDesc();
    
    /**
     * Lấy tất cả ProfileInfo sắp xếp theo FullName
     */
    @Query("SELECT pi FROM ProfileInfo pi ORDER BY pi.fullName")
    List<ProfileInfo> findAllOrderByFullName();
    
    /**
     * Kiểm tra xem FullName đã tồn tại chưa
     */
    @Query("SELECT COUNT(pi) > 0 FROM ProfileInfo pi WHERE LOWER(pi.fullName) = LOWER(:fullName)")
    boolean existsByFullNameIgnoreCase(@Param("fullName") String fullName);
    
    /**
     * Kiểm tra xem FullName đã tồn tại chưa (trừ record hiện tại)
     */
    @Query("SELECT COUNT(pi) > 0 FROM ProfileInfo pi WHERE LOWER(pi.fullName) = LOWER(:fullName) AND pi.profileId != :profileId")
    boolean existsByFullNameIgnoreCaseAndNotSelf(@Param("fullName") String fullName, @Param("profileId") UUID profileId);
    
    /**
     * Đếm tổng số ProfileInfo
     */
    @Query("SELECT COUNT(pi) FROM ProfileInfo pi")
    long countAllProfiles();
}
