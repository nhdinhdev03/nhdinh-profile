package com.nhdinh.profile.modules.BlogPost;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class BlogPostRequest {
    
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;
    
    @Size(max = 200, message = "Slug must not exceed 200 characters")
    private String slug;
    
    @Size(max = 300, message = "Description must not exceed 300 characters")
    private String description;
    
    @Size(max = 512, message = "Thumbnail URL must not exceed 512 characters")
    private String thumbnail;
    
    private String content;
    
    // Default constructor
    public BlogPostRequest() {}
    
    // Constructor
    public BlogPostRequest(String title, String slug, String description, String thumbnail, String content) {
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.thumbnail = thumbnail;
        this.content = content;
    }
    
    // Getters and Setters
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
    
    @Override
    public String toString() {
        return "BlogPostRequest{" +
                "title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
