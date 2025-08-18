package com.nhdinh.profile.modules.HeroSubHeading;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroSubHeadingResponse {
    
    private UUID subId;
    private UUID heroId;
    private String text;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static HeroSubHeadingResponse fromEntity(HeroSubHeading subHeading) {
        return new HeroSubHeadingResponse(
                subHeading.getSubId(),
                subHeading.getHero().getHeroId(),
                subHeading.getText(),
                subHeading.getSortOrder(),
                subHeading.getCreatedAt(),
                subHeading.getUpdatedAt()
        );
    }
}
