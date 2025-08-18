package com.nhdinh.profile.modules.BlogTag;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

@Entity
@Table(name = "BlogTag", schema = "dbo")
public class BlogTag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TagId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID tagId;
    
    @NotBlank(message = "Tag name is required")
    @Size(max = 50, message = "Tag name must not exceed 50 characters")
    @Column(name = "Name", nullable = false, length = 50, unique = true)
    private String name;
    
    // Default constructor
    public BlogTag() {}
    
    // Constructor with name
    public BlogTag(String name) {
        this.name = name;
    }
    
    // Getters and Setters
    public UUID getTagId() {
        return tagId;
    }
    
    public void setTagId(UUID tagId) {
        this.tagId = tagId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    // Utility methods
    public String getDisplayName() {
        return this.name;
    }
    
    public String getNormalizedName() {
        return this.name != null ? this.name.toLowerCase().trim() : null;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        BlogTag blogTag = (BlogTag) obj;
        return tagId != null && tagId.equals(blogTag.tagId);
    }
    
    @Override
    public int hashCode() {
        return tagId != null ? tagId.hashCode() : 0;
    }
    
    @Override
    public String toString() {
        return "BlogTag{" +
                "tagId=" + tagId +
                ", name='" + name + '\'' +
                '}';
    }
}
