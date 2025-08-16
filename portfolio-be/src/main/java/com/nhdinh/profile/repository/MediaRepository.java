package com.nhdinh.profile.repository;

import com.nhdinh.profile.model.Media;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MediaRepository extends JpaRepository<Media, UUID> {
    
    @Query("SELECT m FROM Media m WHERE m.isDeleted = false")
    Page<Media> findAllActive(Pageable pageable);
    
    @Query("SELECT m FROM Media m WHERE m.isDeleted = false AND m.id = :id")
    Optional<Media> findByIdActive(@Param("id") UUID id);
    
    @Query("SELECT m FROM Media m WHERE m.isDeleted = false AND m.mediaType = :mediaType")
    Page<Media> findByMediaType(@Param("mediaType") Media.MediaType mediaType, Pageable pageable);
    
    @Query("SELECT m FROM Media m WHERE m.isDeleted = false AND m.fileName LIKE %:fileName%")
    List<Media> findByFileNameContaining(@Param("fileName") String fileName);
    
    @Query("SELECT m FROM Media m WHERE m.isDeleted = false AND m.hashSha256 = :hash")
    Optional<Media> findByHashSha256(@Param("hash") String hash);
    
    @Query("SELECT m FROM Media m WHERE m.isDeleted = false AND m.storageProvider = :provider")
    List<Media> findByStorageProvider(@Param("provider") String provider);
}
