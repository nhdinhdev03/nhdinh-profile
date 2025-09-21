package com.nhdinh.nhdinh_profile.modules.Hero;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
@Table(name = "HeroTranslation", schema = "dbo", 
       uniqueConstraints = @UniqueConstraint(name = "UQ_HeroTranslation_Hero_Lang", 
                                           columnNames = {"HeroId", "LanguageCode"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroTranslation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TranslationId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID translationId;
    
    @NotNull(message = "Hero không được để trống")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HeroId", nullable = false)
    private Hero hero;
    
    @NotBlank(message = "LanguageCode không được để trống")
    @Size(max = 10, message = "LanguageCode không được vượt quá 10 ký tự")
    @Column(name = "LanguageCode", length = 10, nullable = false)
    private String languageCode;
    
    @Size(max = 256, message = "PreHeading không được vượt quá 256 ký tự")
    @Column(name = "PreHeading", length = 256)
    private String preHeading;
    
    @NotBlank(message = "Heading không được để trống")
    @Size(max = 256, message = "Heading không được vượt quá 256 ký tự")
    @Column(name = "Heading", length = 256, nullable = false)
    private String heading;
    
    @Column(name = "IntroHtml", columnDefinition = "NVARCHAR(MAX)")
    private String introHtml;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false
    )
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "UpdatedAt", insertable = false)
    private LocalDateTime updatedAt;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
}