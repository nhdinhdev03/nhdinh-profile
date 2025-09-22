package com.nhdinh.nhdinh_profile.modules.AdminUser;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for AdminUser entity
 */
@Repository
public interface AdminUserDAO extends JpaRepository<AdminUser, UUID> {

    // login ten tk hoac sdt
    @Query("SELECT a FROM AdminUser a WHERE (a.phoneNumber = :identifier OR a.username = :identifier) AND a.isActive = true")
    Optional<AdminUser> findByPhoneNumberOrUsername(@Param("identifier") String identifier);

    /**
     * Tìm admin theo phone number
     */
    @Query("SELECT au FROM AdminUser au WHERE au.phoneNumber = :phoneNumber")
    Optional<AdminUser> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    /**
     * Tìm admin theo username
     */
    @Query("SELECT au FROM AdminUser au WHERE au.username = :username")
    Optional<AdminUser> findByUsername(@Param("username") String username);

    /**
     * Kiểm tra phone number có tồn tại
     */
    @Query("SELECT COUNT(au) > 0 FROM AdminUser au WHERE au.phoneNumber = :phoneNumber")
    boolean existsByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    /**
     * Kiểm tra username có tồn tại
     */
    @Query("SELECT COUNT(au) > 0 FROM AdminUser au WHERE au.username = :username")
    boolean existsByUsername(@Param("username") String username);

    /**
     * Tìm admin active theo phone hoặc username
     */
    @Query("SELECT au FROM AdminUser au WHERE au.isActive = true AND (au.phoneNumber = :identifier OR au.username = :identifier)")
    Optional<AdminUser> findActiveByPhoneOrUsername(@Param("identifier") String identifier);
}