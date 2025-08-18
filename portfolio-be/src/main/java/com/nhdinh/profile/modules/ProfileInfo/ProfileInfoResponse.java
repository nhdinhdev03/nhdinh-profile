package com.nhdinh.profile.modules.ProfileInfo;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileInfoResponse {
    
    private UUID profileId;
    private String fullName;
    private String title;
    private String bio;
    private String avatarUrl;
    private LocalDateTime createdAt;
    
    public static ProfileInfoResponse fromEntity(ProfileInfo profileInfo) {
        return new ProfileInfoResponse(
                profileInfo.getProfileId(),
                profileInfo.getFullName(),
                profileInfo.getTitle(),
                profileInfo.getBio(),
                profileInfo.getAvatarUrl(),
                profileInfo.getCreatedAt()
        );
    }
}
