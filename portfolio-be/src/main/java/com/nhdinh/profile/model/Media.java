package com.nhdinh.profile.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Media")
public class Media extends BaseEntity {
    
    @Column(name = "FileName", nullable = false, length = 256)
    private String fileName;
    
    @Column(name = "OriginalName", length = 256)
    private String originalName;
    
    @Column(name = "ContentType", length = 128)
    private String contentType;
    
    @Column(name = "Extension", length = 16)
    private String extension;
    
    @Column(name = "SizeBytes", nullable = false)
    private Long sizeBytes;
    
    @Column(name = "Url", nullable = false, length = 512)
    private String url;
    
    @Column(name = "ThumbnailUrl", length = 512)
    private String thumbnailUrl;
    
    @Column(name = "Width")
    private Integer width;
    
    @Column(name = "Height")
    private Integer height;
    
    @Column(name = "DurationSeconds", precision = 10, scale = 2)
    private BigDecimal durationSeconds;
    
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "MediaType", nullable = false)
    private MediaType mediaType = MediaType.IMAGE;
    
    @Column(name = "HashSha256", length = 64)
    private String hashSha256;
    
    @Column(name = "StorageProvider", nullable = false, length = 32)
    private String storageProvider = "local";
    
    public enum MediaType {
        IMAGE(0),
        VIDEO(1),
        AUDIO(2),
        DOCUMENT(3),
        OTHER(4);
        
        private final int value;
        
        MediaType(int value) {
            this.value = value;
        }
        
        public int getValue() {
            return value;
        }
    }
}
