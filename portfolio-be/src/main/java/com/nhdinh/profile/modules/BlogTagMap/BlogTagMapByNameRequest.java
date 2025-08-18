package com.nhdinh.profile.modules.BlogTagMap;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class BlogTagMapByNameRequest {
    
    @NotNull(message = "Blog ID is required")
    private UUID blogId;
    
    @NotBlank(message = "Tag name is required")
    private String tagName;
    
    // Default constructor
    public BlogTagMapByNameRequest() {}
    
    // Constructor
    public BlogTagMapByNameRequest(UUID blogId, String tagName) {
        this.blogId = blogId;
        this.tagName = tagName;
    }
    
    // Getters and Setters
    public UUID getBlogId() {
        return blogId;
    }
    
    public void setBlogId(UUID blogId) {
        this.blogId = blogId;
    }
    
    public String getTagName() {
        return tagName;
    }
    
    public void setTagName(String tagName) {
        this.tagName = tagName;
    }
    
    @Override
    public String toString() {
        return "BlogTagMapByNameRequest{" +
                "blogId=" + blogId +
                ", tagName='" + tagName + '\'' +
                '}';
    }
}
