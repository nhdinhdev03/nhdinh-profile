package com.nhdinh.profile.modules.ProfileTag;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.nhdinh.profile.modules.ProfileInfo.ProfileInfo;

/**
 * ProfileTag Entity Class
 * Represents skills/tags associated with a user profile
 */
@Entity
@Table(name = "ProfileTag", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileTag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TagId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID tagId;
    
    @NotNull(message = "Profile ID không được để trống")
    @Column(name = "ProfileId", nullable = false, columnDefinition = "UNIQUEIDENTIFIER")
    private UUID profileId;
    
    @Size(max = 100, message = "Label không được vượt quá 100 ký tự")
    @Column(name = "Label", length = 100)
    private String label;
    
    @Column(name = "SortOrder", columnDefinition = "INT DEFAULT 1")
    private int sortOrder = 1;
    
    @Version
    @Column(name = "RowVer", columnDefinition = "ROWVERSION")
    private byte[] rowVer;

    // Constructor for creating new tag (without ID)
    public ProfileTag(UUID profileId, String label, int sortOrder) {
        this.profileId = profileId;
        this.label = label;
        this.sortOrder = sortOrder;
    }
}
