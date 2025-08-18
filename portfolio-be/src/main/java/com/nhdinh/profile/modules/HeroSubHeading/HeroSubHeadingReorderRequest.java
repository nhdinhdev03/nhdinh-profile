package com.nhdinh.profile.modules.HeroSubHeading;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroSubHeadingReorderRequest {
    
    @NotNull(message = "SubId không được để trống")
    private UUID subId;
    
    @NotNull(message = "SortOrder không được để trống")
    private Integer sortOrder;
}
