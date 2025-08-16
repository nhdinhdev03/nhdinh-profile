package com.nhdinh.profile.repository;

import com.nhdinh.profile.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, UUID> {
    
    @Query("SELECT p FROM Permission p WHERE p.code = :code")
    Optional<Permission> findByCode(@Param("code") String code);
    
    @Query("SELECT p FROM Permission p WHERE p.groupName = :groupName")
    List<Permission> findByGroupName(@Param("groupName") String groupName);
    
    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Permission p WHERE p.code = :code")
    boolean existsByCode(@Param("code") String code);
}
