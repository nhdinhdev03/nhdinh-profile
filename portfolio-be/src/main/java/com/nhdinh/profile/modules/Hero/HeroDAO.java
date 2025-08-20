package com.nhdinh.profile.modules.Hero;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroDAO extends JpaRepository<Hero, UUID> {
    
    /**
     * Lấy tất cả Hero chưa bị xóa
     */
    @Query("SELECT h FROM Hero h WHERE (h.isDeleted = false OR h.isDeleted IS NULL) ORDER BY h.createdAt DESC")
    List<Hero> findAllNotDeleted();
    
    /**
     * Lấy tất cả Hero đã bị xóa (lưu trữ)
     */
    @Query("SELECT h FROM Hero h WHERE h.isDeleted = true ORDER BY h.updatedAt DESC")
    List<Hero> findAllDeleted();
    
    /**
     * Lấy Hero đầu tiên chưa bị xóa
     */
    @Query(value = "SELECT TOP 1 h.* FROM dbo.Hero h WHERE (h.IsDeleted = 0 OR h.IsDeleted IS NULL) ORDER BY h.CreatedAt DESC", nativeQuery = true)
    Optional<Hero> findFirstNotDeleted();
    
    /**
     * Lấy tất cả Hero theo trạng thái isDeleted
     */
    @Query("SELECT h FROM Hero h WHERE h.isDeleted = :isDeleted ORDER BY h.updatedAt DESC")
    List<Hero> findByIsDeleted(@Param("isDeleted") Boolean isDeleted);
    
    /**
     * Soft delete Hero
     */
    @Query("UPDATE Hero h SET h.isDeleted = true WHERE h.heroId = :heroId")
    void softDeleteById(@Param("heroId") UUID heroId);
}
