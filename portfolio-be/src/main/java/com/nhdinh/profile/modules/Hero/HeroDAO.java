package com.nhdinh.profile.modules.Hero;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface HeroDAO extends JpaRepository<Hero, UUID> {
    
    /**
     * Tìm Hero theo locale và chưa bị xóa
     */
    @Query("SELECT h FROM Hero h WHERE h.locale = :locale AND (h.isDeleted = false OR h.isDeleted IS NULL)")
    Optional<Hero> findByLocaleAndNotDeleted(@Param("locale") String locale);
    
    /**
     * Lấy tất cả Hero chưa bị xóa
     */
    @Query("SELECT h FROM Hero h WHERE (h.isDeleted = false OR h.isDeleted IS NULL) ORDER BY h.createdAt DESC")
    List<Hero> findAllNotDeleted();
    
    /**
     * Lấy tất cả Hero theo trạng thái isDeleted
     */
    @Query("SELECT h FROM Hero h WHERE h.isDeleted = :isDeleted ORDER BY h.updatedAt DESC")
    List<Hero> findByIsDeleted(@Param("isDeleted") Boolean isDeleted);
    
    /**
     * Kiểm tra xem locale đã tồn tại chưa (trừ record hiện tại)
     */
    @Query("SELECT COUNT(h) > 0 FROM Hero h WHERE h.locale = :locale AND h.heroId != :heroId AND (h.isDeleted = false OR h.isDeleted IS NULL)")
    boolean existsByLocaleAndNotSelf(@Param("locale") String locale, @Param("heroId") UUID heroId);
    
    /**
     * Kiểm tra xem locale đã tồn tại chưa
     */
    @Query("SELECT COUNT(h) > 0 FROM Hero h WHERE h.locale = :locale AND (h.isDeleted = false OR h.isDeleted IS NULL)")
    boolean existsByLocaleAndNotDeleted(@Param("locale") String locale);
    
    /**
     * Soft delete Hero
     */
    @Query("UPDATE Hero h SET h.isDeleted = true WHERE h.heroId = :heroId")
    void softDeleteById(@Param("heroId") UUID heroId);
}
