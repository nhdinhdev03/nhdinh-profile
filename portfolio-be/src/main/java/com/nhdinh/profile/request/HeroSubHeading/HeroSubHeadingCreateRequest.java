package com.nhdinh.profile.request.HeroSubHeading;

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
public class HeroSubHeadingCreateRequest {
    
    @NotNull(message = "HeroId không được để trống")
    private UUID heroId;
    
    @NotBlank(message = "Text không được để trống")
    @Size(max = 256, message = "Text không được vượt quá 256 ký tự")
    private String text;
    
    private Integer sortOrder;
}
