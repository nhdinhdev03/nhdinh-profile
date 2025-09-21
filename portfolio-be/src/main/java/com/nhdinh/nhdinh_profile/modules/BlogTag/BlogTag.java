package com.nhdinh.nhdinh_profile.modules.BlogTag;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

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
@Table(name = "BlogTag", schema = "dbo",
       uniqueConstraints = @UniqueConstraint(name = "UQ_BlogTag_Name", 
                                           columnNames = {"Name"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogTag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TagId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID tagId;
    
    @NotBlank(message = "Name không được để trống")
    @Size(max = 50, message = "Name không được vượt quá 50 ký tự")
    @Column(name = "Name", length = 50, nullable = false)
    private String name;
    
    @NotNull
    @Column(name = "IsActive", nullable = false)
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
    
    // Relationships
    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<BlogTagMap> blogMaps;
}