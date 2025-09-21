package com.nhdinh.nhdinh_profile.response.Hero;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroTranslationResponse {
    
    private UUID translationId;
    private String languageCode;
    private String preHeading;
    private String heading;
    private String introHtml;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}