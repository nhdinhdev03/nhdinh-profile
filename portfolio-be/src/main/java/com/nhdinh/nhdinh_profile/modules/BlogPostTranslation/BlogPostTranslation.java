package com.nhdinh.nhdinh_profile.modules.BlogPostTranslation;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nhdinh.nhdinh_profile.modules.BlogPost.BlogPost;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "BlogPostTranslation", schema = "dbo",
       uniqueConstraints = @UniqueConstraint(name = "UQ_BlogPostTranslation_Blog_Lang", 
                                           columnNames = {"BlogId", "LanguageCode"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostTranslation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TranslationId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID translationId;
    
    @NotNull(message = "BlogPost không được để trống")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BlogId", nullable = false)
    @JsonIgnoreProperties({"translations", "tagMaps", "hibernateLazyInitializer", "handler"})
    private BlogPost blogPost;
    
    @NotBlank(message = "LanguageCode không được để trống")
    @Size(max = 10, message = "LanguageCode không được vượt quá 10 ký tự")
    @Column(name = "LanguageCode", length = 10, nullable = false)
    private String languageCode;
    
    @NotBlank(message = "Title không được để trống")
    @Size(max = 200, message = "Title không được vượt quá 200 ký tự")
    @Column(name = "Title", length = 200, nullable = false)
    private String title;
    
    @Size(max = 300, message = "Description không được vượt quá 300 ký tự")
    @Column(name = "Description", length = 300)
    private String description;
    
    @Column(name = "Content", columnDefinition = "NVARCHAR(MAX)")
    private String content;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "UpdatedAt", insertable = false)
    private LocalDateTime updatedAt;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
}