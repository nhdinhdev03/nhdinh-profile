package com.nhdinh.nhdinh_profile.request.Hero;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroSubHeadingRequest {
    
    @NotBlank(message = "LanguageCode không được để trống")
    @Size(max = 10, message = "LanguageCode không được vượt quá 10 ký tự")
    private String languageCode;
    
    @NotBlank(message = "Text không được để trống")
    @Size(max = 256, message = "Text không được vượt quá 256 ký tự")
    private String text;
    
    @NotNull(message = "SortOrder không được để trống")
    private Integer sortOrder = 1;
}