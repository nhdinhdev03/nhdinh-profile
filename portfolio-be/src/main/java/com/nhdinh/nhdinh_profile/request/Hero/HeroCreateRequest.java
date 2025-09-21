package com.nhdinh.nhdinh_profile.request.Hero;

import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroCreateRequest {
    
    @NotEmpty(message = "Translations không được để trống")
    @Valid
    private Map<String, HeroTranslationRequest> translations;
    
    @Valid
    private List<HeroSubHeadingRequest> subHeadings;
}