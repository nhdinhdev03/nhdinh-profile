package com.nhdinh.profile.request.ProfileTag;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileTagUpdateRequest {
    
    @Size(max = 100, message = "Label không được vượt quá 100 ký tự")
    private String label;
    
    private Integer sortOrder;
}
