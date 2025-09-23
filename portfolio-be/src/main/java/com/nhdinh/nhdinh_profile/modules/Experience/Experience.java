package com.nhdinh.nhdinh_profile.modules.Experience;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import com.nhdinh.nhdinh_profile.modules.ProfileInfo.ProfileInfo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

/**
 * Entity representing work experience
 * Maps to dbo.Experience table
 */
@Entity
@Table(name = "Experience", schema = "dbo")
public class Experience {

    @Id
    @UuidGenerator
    @Column(name = "ExpId", nullable = false)
    private UUID expId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ProfileId", nullable = false,
                foreignKey = @ForeignKey(name = "FK_Experience_ProfileInfo"))
    private ProfileInfo profileInfo;

    @Size(max = 100, message = "Position must not exceed 100 characters")
    @Column(name = "Position", length = 100)
    private String position;

    @Size(max = 100, message = "Company must not exceed 100 characters")
    @Column(name = "Company", length = 100)
    private String company;

    @Column(name = "Description", columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Min(value = 1900, message = "Start year must be at least 1900")
    @Column(name = "StartYear")
    private Integer startYear;

    @Min(value = 1900, message = "End year must be at least 1900")
    @Column(name = "EndYear")
    private Integer endYear;

    @Column(name = "IsCurrent", nullable = false)
    private Boolean isCurrent = false;

    @Min(value = 1, message = "Sort order must be at least 1")
    @Column(name = "SortOrder", nullable = false)
    private Integer sortOrder = 1;

    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @Version
    @Column(name = "RowVer")
    private byte[] rowVer;

    // Default constructor
    public Experience() {}

    // Constructor with required fields
    public Experience(ProfileInfo profileInfo) {
        this.profileInfo = profileInfo;
    }

    // Validation method for year logic
    @PrePersist
    @PreUpdate
    private void validateYears() {
        if (startYear != null && endYear != null && !isCurrent && startYear > endYear) {
            throw new IllegalArgumentException("Start year cannot be greater than end year");
        }
        if (isCurrent && endYear != null) {
            throw new IllegalArgumentException("End year should be null for current positions");
        }
    }

    // Getters and Setters
    public UUID getExpId() {
        return expId;
    }

    public void setExpId(UUID expId) {
        this.expId = expId;
    }

    public ProfileInfo getProfileInfo() {
        return profileInfo;
    }

    public void setProfileInfo(ProfileInfo profileInfo) {
        this.profileInfo = profileInfo;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    public Integer getEndYear() {
        return endYear;
    }

    public void setEndYear(Integer endYear) {
        this.endYear = endYear;
    }

    public Boolean getIsCurrent() {
        return isCurrent;
    }

    public void setIsCurrent(Boolean isCurrent) {
        this.isCurrent = isCurrent;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public byte[] getRowVer() {
        return rowVer;
    }

    public void setRowVer(byte[] rowVer) {
        this.rowVer = rowVer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Experience)) return false;
        Experience that = (Experience) o;
        return expId != null && expId.equals(that.expId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Experience{" +
                "expId=" + expId +
                ", position='" + position + '\'' +
                ", company='" + company + '\'' +
                ", startYear=" + startYear +
                ", endYear=" + endYear +
                ", isCurrent=" + isCurrent +
                ", sortOrder=" + sortOrder +
                '}';
    }
}