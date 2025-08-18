package com.nhdinh.profile.modules.HeroSubHeading;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroSubHeadingUpdateRequest {
    
    @NotBlank(message = "Text không được để trống")
    @Size(max = 256, message = "Text không được vượt quá 256 ký tự")
    private String text;
    
    private Integer sortOrder;
}
