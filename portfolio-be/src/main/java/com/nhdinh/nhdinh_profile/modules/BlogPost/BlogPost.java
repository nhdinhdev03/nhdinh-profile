package com.nhdinh.nhdinh_profile.modules.BlogPost;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import com.nhdinh.nhdinh_profile.modules.BlogTagMap.BlogTagMap;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "BlogPost", schema = "dbo",
       uniqueConstraints = @UniqueConstraint(name = "UQ_BlogPost_Slug", 
                                           columnNames = {"Slug"}))
@Where(clause = "IsDeleted = 0")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPost {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "BlogId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID blogId;
    
    @NotBlank(message = "Slug không được để trống")
    @Size(max = 200, message = "Slug không được vượt quá 200 ký tự")
    @Column(name = "Slug", length = 200, nullable = false)
    private String slug;
    
    @Size(max = 512, message = "Thumbnail không được vượt quá 512 ký tự")
    @Column(name = "Thumbnail", length = 512)
    private String thumbnail;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "UpdatedAt", insertable = false)
    private LocalDateTime updatedAt;
    
    @NotNull
    @Column(name = "IsDeleted", nullable = false)
    private Boolean isDeleted = false;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
    
    // Relationships
    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<BlogPostTranslation> translations;
    
    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<BlogTagMap> tagMaps;
}