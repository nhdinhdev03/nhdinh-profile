package com.nhdinh.profile.request.ProfileInfo;

import com.nhdinh.profile.modules.ProfileInfo.ProfileInfo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileInfoCreateRequest {
    
    @NotBlank(message = "Full Name không được để trống")
    @Size(max = 100, message = "Full Name không được vượt quá 100 ký tự")
    private String fullName;
    
    @Size(max = 100, message = "Title không được vượt quá 100 ký tự")
    private String title;
    
    private String bio;
    
    @Size(max = 512, message = "Avatar URL không được vượt quá 512 ký tự")
    private String avatarUrl;
    
    public ProfileInfo toEntity() {
        return new ProfileInfo(fullName, title, bio, avatarUrl);
    }
}
