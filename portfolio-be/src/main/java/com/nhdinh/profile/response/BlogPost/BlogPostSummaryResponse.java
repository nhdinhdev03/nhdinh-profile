package com.nhdinh.profile.response.BlogPost;

import java.time.LocalDateTime;
import java.util.UUID;

public class BlogPostSummaryResponse {
    
    private UUID blogId;
    private String title;
    private String slug;
    private String description;
    private String thumbnail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDeleted;
    
    public BlogPostSummaryResponse() {}
    
    public BlogPostSummaryResponse(UUID blogId, String title, String slug, String description, 
                                  String thumbnail, LocalDateTime createdAt, LocalDateTime updatedAt, 
                                  Boolean isDeleted) {
        this.blogId = blogId;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.thumbnail = thumbnail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isDeleted = isDeleted;
    }
    
    // Getters and Setters
    public UUID getBlogId() {
        return blogId;
    }
    
    public void setBlogId(UUID blogId) {
        this.blogId = blogId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getSlug() {
        return slug;
    }
    
    public void setSlug(String slug) {
        this.slug = slug;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getThumbnail() {
        return thumbnail;
    }
    
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public Boolean getIsDeleted() {
        return isDeleted;
    }
    
    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
    
    @Override
    public String toString() {
        return "BlogPostSummaryResponse{" +
                "blogId=" + blogId +
                ", title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", isDeleted=" + isDeleted +
                '}';
    }
}
