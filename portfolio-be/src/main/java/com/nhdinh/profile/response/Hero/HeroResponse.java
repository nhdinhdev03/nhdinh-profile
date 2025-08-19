package com.nhdinh.profile.response.Hero;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

import com.nhdinh.profile.modules.Hero.Hero;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroResponse {
    
    private UUID heroId;
    private String locale;
    private String preHeading;
    private String heading;
    private String introHtml;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDeleted;
    
    public static HeroResponse fromEntity(Hero hero) {
        return new HeroResponse(
                hero.getHeroId(),
                hero.getLocale(),
                hero.getPreHeading(),
                hero.getHeading(),
                hero.getIntroHtml(),
                hero.getCreatedAt(),
                hero.getUpdatedAt(),
                hero.getIsDeleted()
        );
    }
}
