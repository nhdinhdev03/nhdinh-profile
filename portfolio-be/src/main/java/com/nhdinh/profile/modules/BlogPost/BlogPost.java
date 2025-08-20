package com.nhdinh.profile.modules.BlogPost;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "BlogPost", schema = "dbo")
public class BlogPost {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "BlogId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID blogId;
    
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    @Column(name = "Title", nullable = false, length = 200)
    private String title;
    
    @NotBlank(message = "Slug is required")
    @Size(max = 200, message = "Slug must not exceed 200 characters")
    @Column(name = "Slug", nullable = false, length = 200, unique = true)
    private String slug;
    
    @Size(max = 300, message = "Description must not exceed 300 characters")
    @Column(name = "Description", length = 300)
    private String description;
    
    @Size(max = 512, message = "Thumbnail URL must not exceed 512 characters")
    @Column(name = "Thumbnail", length = 512)
    private String thumbnail;
    
    @Column(name = "Content", columnDefinition = "NVARCHAR(MAX)")
    private String content;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;
    
    @Column(name = "IsDeleted", nullable = false)
    private Boolean isDeleted = false;
    
    @Version
    @Column(name = "RowVer")
    private byte[] rowVer;
    
    // Default constructor
    public BlogPost() {}
    
    // Constructor for creating new blog post
    public BlogPost(String title, String slug, String description, String thumbnail, String content) {
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.thumbnail = thumbnail;
        this.content = content;
        this.isDeleted = false;
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
    
    public byte[] getRowVer() {
        return rowVer;
    }
    
    public void setRowVer(byte[] rowVer) {
        this.rowVer = rowVer;
    }
    
    // Utility methods
    public void markAsDeleted() {
        this.isDeleted = true;
    }
    
    public void restore() {
        this.isDeleted = false;
    }
    
    public boolean isActive() {
        return !this.isDeleted;
    }
    
    @Override
    public String toString() {
        return "BlogPost{" +
                "blogId=" + blogId +
                ", title='" + title + '\'' +
                ", slug='" + slug + '\'' +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", isDeleted=" + isDeleted +
                '}';
    }
}
