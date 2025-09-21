package com.nhdinh.nhdinh_profile.response.Hero;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroResponse {
    
    private UUID heroId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDeleted;
    private List<HeroTranslationResponse> translations;
    private List<HeroSubHeadingResponse> subHeadings;
}