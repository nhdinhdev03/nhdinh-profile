package com.nhdinh.profile.modules.ProfileInfo;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProfileInfo Entity Class
 * Represents user profile information
 */
@Entity
@Table(name = "ProfileInfo", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileInfo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ProfileId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID profileId;
    
    @Size(max = 100, message = "Full Name không được vượt quá 100 ký tự")
    @Column(name = "FullName", length = 100)
    private String fullName;
    
    @Size(max = 100, message = "Title không được vượt quá 100 ký tự")
    @Column(name = "Title", length = 100)
    private String title;
    
    @Column(name = "Bio", columnDefinition = "NVARCHAR(MAX)")
    private String bio;
    
    @Size(max = 512, message = "Avatar URL không được vượt quá 512 ký tự")
    @Column(name = "AvatarUrl", length = 512)
    private String avatarUrl;
    
    @Column(name = "CreatedAt", nullable = false, updatable = false, 
            columnDefinition = "DATETIME2 DEFAULT SYSUTCDATETIME()")
    private LocalDateTime createdAt;
    
    @Version
    @Column(name = "RowVer", columnDefinition = "ROWVERSION")
    private byte[] rowVer;

    // Constructor for creating new profile (without ID and timestamps)
    public ProfileInfo(String fullName, String title, String bio, String avatarUrl) {
        this.fullName = fullName;
        this.title = title;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.createdAt = LocalDateTime.now();
    }
}
