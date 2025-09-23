package com.nhdinh.nhdinh_profile.modules.Hero;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nhdinh.nhdinh_profile.modules.HeroSubHeading.HeroSubHeading;
import com.nhdinh.nhdinh_profile.modules.HeroTranslation.HeroTranslation;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Hero", schema = "dbo")
@SQLRestriction("IsDeleted = 0")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
@NoArgsConstructor
public class Hero {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "HeroId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID heroId;
    
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
    @OneToMany(mappedBy = "hero", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private List<HeroTranslation> translations;
    
    @OneToMany(mappedBy = "hero", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private List<HeroSubHeading> subHeadings;
}