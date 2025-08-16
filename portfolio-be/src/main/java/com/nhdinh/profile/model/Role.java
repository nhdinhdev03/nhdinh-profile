package com.nhdinh.profile.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@Table(name = "Roles")
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "Id", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID id;
    
    @Column(name = "Name", nullable = false, unique = true, length = 64)
    private String name;
    
    @Column(name = "DisplayName", length = 128)
    private String displayName;
    
    @Column(name = "Description", length = 256)
    private String description;
    
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Version
    @Column(name = "RowVersion")
    private byte[] rowVersion;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "RolePermissions",
               joinColumns = @JoinColumn(name = "RoleId"),
               inverseJoinColumns = @JoinColumn(name = "PermissionId"))
    private Set<Permission> permissions = new HashSet<>();
}
