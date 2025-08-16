package com.nhdinh.profile.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Users", indexes = {
    @Index(name = "IX_Users_Email", columnList = "Email")
})
public class User extends BaseEntity {
    
    @Column(name = "Username", nullable = false, unique = true, length = 64)
    private String username;
    
    @Column(name = "Email", nullable = false, unique = true, length = 256)
    private String email;
    
    @Column(name = "PasswordHash", nullable = false, length = 256)
    private String passwordHash;
    
    @Column(name = "FirstName", length = 64)
    private String firstName;
    
    @Column(name = "LastName", length = 64)
    private String lastName;
    
    @Column(name = "PhoneNumber", length = 20)
    private String phoneNumber;
    
    @Column(name = "EmailVerified", nullable = false)
    private Boolean emailVerified = false;
    
    @Column(name = "PhoneVerified", nullable = false)
    private Boolean phoneVerified = false;
    
    @Column(name = "TwoFactorEnabled", nullable = false)
    private Boolean twoFactorEnabled = false;
    
    @Column(name = "FailedLoginAttempts", nullable = false)
    private Integer failedLoginAttempts = 0;
    
    @Column(name = "LockedUntil")
    private LocalDateTime lockedUntil;
    
    @Column(name = "LastLoginAt")
    private LocalDateTime lastLoginAt;
    
    @Column(name = "LastPasswordChangedAt")
    private LocalDateTime lastPasswordChangedAt;
    
    @Column(name = "Timezone", length = 64)
    private String timezone;
    
    @Column(name = "Locale", length = 10)
    private String locale;
    
    @Column(name = "Status", nullable = false)
    private Integer status = 1; // 0=Inactive, 1=Active, 2=Suspended
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AvatarMediaId")
    private Media avatarMedia;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "UserRoles",
               joinColumns = @JoinColumn(name = "UserId"),
               inverseJoinColumns = @JoinColumn(name = "RoleId"))
    private Set<Role> roles = new HashSet<>();
}
