package com.nhdinh.nhdinh_profile.request.Project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagRequest {
    
    @NotBlank(message = "Name không được để trống")
    @Size(max = 50, message = "Name không được vượt quá 50 ký tự")
    private String name;
    
    @Size(max = 255, message = "Description không được vượt quá 255 ký tự")
    private String description;
    
    @Size(max = 7, message = "Color phải là mã màu hex hợp lệ (#RRGGBB)")
    private String color;
    
    @Size(max = 50, message = "Icon không được vượt quá 50 ký tự")
    private String icon;
    
    @Size(max = 30, message = "Category không được vượt quá 30 ký tự")
    private String category;
    
    private Boolean isActive = true;
}