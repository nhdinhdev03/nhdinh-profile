package com.nhdinh.profile.modules.HeroSubHeading;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.nhdinh.profile.modules.Hero.Hero;

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
@Table(name = "HeroSubHeading", schema = "dbo", 
       uniqueConstraints = @UniqueConstraint(name = "UQ_SubHeading", 
                                           columnNames = {"HeroId", "Text"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroSubHeading {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "SubId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID subId;
    
    @NotNull(message = "Hero không được để trống")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HeroId", nullable = false)
    private Hero hero;
    
    @NotBlank(message = "Text không được để trống")
    @Size(max = 256, message = "Text không được vượt quá 256 ký tự")
    @Column(name = "Text", length = 256, nullable = false)
    private String text;
    
    @NotNull(message = "SortOrder không được để trống")
    @Column(name = "SortOrder", nullable = false)
    private Integer sortOrder = 1;
    
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
