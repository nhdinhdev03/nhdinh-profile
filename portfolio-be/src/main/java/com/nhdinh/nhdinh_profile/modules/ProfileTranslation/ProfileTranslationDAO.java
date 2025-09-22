package com.nhdinh.nhdinh_profile.modules.ProfileTranslation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for ProfileTranslation entity
 */
@Repository
public interface ProfileTranslationDAO extends JpaRepository<ProfileTranslation, UUID> {
    
    /**
     * Lấy tất cả translations của một Profile
     */
    @Query("SELECT pt FROM ProfileTranslation pt WHERE pt.profileInfo.profileId = :profileId ORDER BY pt.languageCode")
    List<ProfileTranslation> findByProfileId(@Param("profileId") UUID profileId);
    
    /**
     * Lấy translation theo Profile và language code
     */
    @Query("SELECT pt FROM ProfileTranslation pt WHERE pt.profileInfo.profileId = :profileId AND pt.languageCode = :languageCode")
    Optional<ProfileTranslation> findByProfileIdAndLanguageCode(@Param("profileId") UUID profileId, @Param("languageCode") String languageCode);
    
    /**
     * Kiểm tra translation có tồn tại
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProfileTranslation pt WHERE pt.profileInfo.profileId = :profileId AND pt.languageCode = :languageCode")
    boolean existsByProfileIdAndLanguageCode(@Param("profileId") UUID profileId, @Param("languageCode") String languageCode);
    
    /**
     * Lấy tất cả language codes của một Profile
     */
    @Query("SELECT DISTINCT pt.languageCode FROM ProfileTranslation pt WHERE pt.profileInfo.profileId = :profileId ORDER BY pt.languageCode")
    List<String> findLanguageCodesByProfileId(@Param("profileId") UUID profileId);
}


