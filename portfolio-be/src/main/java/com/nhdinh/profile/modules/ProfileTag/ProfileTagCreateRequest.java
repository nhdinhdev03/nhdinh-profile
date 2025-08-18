package com.nhdinh.profile.modules.ProfileTag;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileTagCreateRequest {
    
    @NotNull(message = "Profile ID không được để trống")
    private UUID profileId;
    
    @NotBlank(message = "Label không được để trống")
    @Size(max = 100, message = "Label không được vượt quá 100 ký tự")
    private String label;
    
    private int sortOrder = 1;
    
    public ProfileTag toEntity() {
        return new ProfileTag(profileId, label, sortOrder);
    }
}
