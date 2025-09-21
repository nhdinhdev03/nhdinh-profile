package com.nhdinh.nhdinh_profile.modules.BlogTagMap;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogTagMapId implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Column(name = "BlogId")
    private UUID blogId;
    
    @Column(name = "TagId")
    private UUID tagId;
}