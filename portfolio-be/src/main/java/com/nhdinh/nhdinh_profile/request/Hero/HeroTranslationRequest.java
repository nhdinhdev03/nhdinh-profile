package com.nhdinh.nhdinh_profile.request.Hero;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroTranslationRequest {
    
    @NotBlank(message = "LanguageCode không được để trống")
    @Size(max = 10, message = "LanguageCode không được vượt quá 10 ký tự")
    private String languageCode;
    
    @Size(max = 256, message = "PreHeading không được vượt quá 256 ký tự")
    private String preHeading;
    
    @NotBlank(message = "Heading không được để trống")
    @Size(max = 256, message = "Heading không được vượt quá 256 ký tự")
    private String heading;
    
    private String introHtml;
}