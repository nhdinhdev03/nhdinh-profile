package com.nhdinh.nhdinh_profile.modules.ProfileTranslation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * DAO interface for ProfileTranslation entity
 * Provides database operations for profile translations
 */
@Repository
public interface ProfileTranslationDAO extends JpaRepository<ProfileTranslation, UUID> {

    /**
     * Find translation by profile ID and language code
     */
    @Query("SELECT pt FROM ProfileTranslation pt " +
           "WHERE pt.profileInfo.profileId = :profileId AND pt.languageCode = :languageCode")
    Optional<ProfileTranslation> findByProfileIdAndLanguageCode(
            @Param("profileId") UUID profileId, 
            @Param("languageCode") String languageCode);

    /**
     * Find all translations for a specific profile
     */
    @Query("SELECT pt FROM ProfileTranslation pt " +
           "WHERE pt.profileInfo.profileId = :profileId " +
           "ORDER BY pt.languageCode")
    List<ProfileTranslation> findAllByProfileId(@Param("profileId") UUID profileId);

    /**
     * Find translations by language code across all profiles
     */
    @Query("SELECT pt FROM ProfileTranslation pt " +
           "WHERE pt.languageCode = :languageCode " +
           "ORDER BY pt.createdAt DESC")
    List<ProfileTranslation> findAllByLanguageCode(@Param("languageCode") String languageCode);

    /**
     * Get all available language codes for a profile
     */
    @Query("SELECT DISTINCT pt.languageCode FROM ProfileTranslation pt " +
           "WHERE pt.profileInfo.profileId = :profileId " +
           "ORDER BY pt.languageCode")
    List<String> findLanguageCodesByProfileId(@Param("profileId") UUID profileId);

    /**
     * Check if translation exists for profile and language
     */
    @Query("SELECT COUNT(pt) > 0 FROM ProfileTranslation pt " +
           "WHERE pt.profileInfo.profileId = :profileId AND pt.languageCode = :languageCode")
    boolean existsByProfileIdAndLanguageCode(
            @Param("profileId") UUID profileId, 
            @Param("languageCode") String languageCode);

    /**
     * Find translations with non-empty bio
     */
    @Query("SELECT pt FROM ProfileTranslation pt " +
           "WHERE pt.profileInfo.profileId = :profileId " +
           "AND pt.bio IS NOT NULL AND pt.bio != '' " +
           "ORDER BY pt.languageCode")
    List<ProfileTranslation> findWithBioByProfileId(@Param("profileId") UUID profileId);

    /**
     * Search translations by full name or title
     */
    @Query("SELECT pt FROM ProfileTranslation pt " +
           "WHERE pt.profileInfo.profileId = :profileId " +
           "AND (LOWER(pt.fullName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(pt.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<ProfileTranslation> searchByNameOrTitle(
            @Param("profileId") UUID profileId, 
            @Param("searchTerm") String searchTerm);

    /**
     * Delete all translations for a profile
     */
    @Query("DELETE FROM ProfileTranslation pt WHERE pt.profileInfo.profileId = :profileId")
    void deleteAllByProfileId(@Param("profileId") UUID profileId);
}