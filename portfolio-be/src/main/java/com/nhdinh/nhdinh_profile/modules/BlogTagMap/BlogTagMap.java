package com.nhdinh.nhdinh_profile.modules.BlogTagMap;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.nhdinh.nhdinh_profile.modules.BlogPost.BlogPost;
import com.nhdinh.nhdinh_profile.modules.BlogTag.BlogTag;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "BlogTagMap", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogTagMap {
    
    @EmbeddedId
    private BlogTagMapId id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("blogId")
    @JoinColumn(name = "BlogId")
    private BlogPost blogPost;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tagId")
    @JoinColumn(name = "TagId")
    private BlogTag tag;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
}