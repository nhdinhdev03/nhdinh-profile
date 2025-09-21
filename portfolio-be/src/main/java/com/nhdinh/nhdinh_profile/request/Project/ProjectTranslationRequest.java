package com.nhdinh.nhdinh_profile.request.Project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTranslationRequest {
    
    @NotBlank(message = "LanguageCode không được để trống")
    @Size(max = 10, message = "LanguageCode không được vượt quá 10 ký tự")
    private String languageCode;
    
    @NotBlank(message = "Title không được để trống")
    @Size(max = 100, message = "Title không được vượt quá 100 ký tự")
    private String title;
    
    @Size(max = 500, message = "Description không được vượt quá 500 ký tự")
    private String description;
    
    @Size(max = 100, message = "MetaTitle không được vượt quá 100 ký tự")
    private String metaTitle;
    
    @Size(max = 200, message = "MetaDescription không được vượt quá 200 ký tự")
    private String metaDescription;
}