package com.nhdinh.profile.modules.ProjectCategory;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ProjectCategory", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectCategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CategoryId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID categoryId;
    
    @NotBlank(message = "Name không được để trống")
    @Size(max = 50, message = "Name không được vượt quá 50 ký tự")
    @Column(name = "Name", length = 50, nullable = false, unique = true)
    private String name;
}