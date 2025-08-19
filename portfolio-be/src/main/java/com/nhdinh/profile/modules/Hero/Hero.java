package com.nhdinh.profile.modules.Hero;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.nhdinh.profile.modules.HeroSubHeading.HeroSubHeading;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Hero", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hero {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "HeroId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID heroId;
    
    @NotBlank(message = "Locale không được để trống")
    @Size(max = 10, message = "Locale không được vượt quá 10 ký tự")
    @Column(name = "Locale", length = 10, nullable = false, unique = true)
    private String locale;
    
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
    
    @OneToMany(mappedBy = "hero", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy("sortOrder ASC")
    private List<HeroSubHeading> subHeadings;
}
