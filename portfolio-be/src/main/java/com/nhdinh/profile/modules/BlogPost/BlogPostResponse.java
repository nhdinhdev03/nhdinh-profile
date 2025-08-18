package com.nhdinh.profile.modules.BlogPost;

import java.time.LocalDateTime;
import java.util.UUID;

public class BlogPostResponse {
    
    private UUID blogId;
    private String title;
    private String slug;
    private String description;
    private String thumbnail;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isDeleted;
    
    // Default constructor
    public BlogPostResponse() {}
    
    // Constructor from BlogPost entity
    public BlogPostResponse(BlogPost blogPost) {
        this.blogId = blogPost.getBlogId();
        this.title = blogPost.getTitle();
        this.slug = blogPost.getSlug();
        this.description = blogPost.getDescription();
        this.thumbnail = blogPost.getThumbnail();
        this.content = blogPost.getContent();
        this.createdAt = blogPost.getCreatedAt();
        this.updatedAt = blogPost.getUpdatedAt();
        this.isDeleted = blogPost.getIsDeleted();
    }
    
    // Constructor for summary (without content)
    public BlogPostResponse(UUID blogId, String title, String slug, String description, 
                          String thumbnail, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.blogId = blogId;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.thumbnail = thumbnail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isDeleted = false;
    }
    
    // Static factory method for creating summary response (without content)
    public static BlogPostResponse createSummary(BlogPost blogPost) {
        return new BlogPostResponse(
            blogPost.getBlogId(),
            blogPost.getTitle(),
            blogPost.getSlug(),
            blogPost.getDescription(),
            blogPost.getThumbnail(),
            blogPost.getCreatedAt(),
            blogPost.getUpdatedAt()
        );
    }
    
    // Static factory method for creating full response
    public static BlogPostResponse createFull(BlogPost blogPost) {
        return new BlogPostResponse(blogPost);
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
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
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
        return "BlogPostResponse{" +
                "blogId=" + blogId +
                ", title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
