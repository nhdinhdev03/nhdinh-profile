package com.nhdinh.profile.response.BlogTagMap;

import com.nhdinh.profile.modules.BlogTag.BlogTag;
import java.util.UUID;

public class BlogTagCoOccurrenceResponse {
    
    private UUID tag1Id;
    private String tag1Name;
    private UUID tag2Id;
    private String tag2Name;
    private Long coOccurrenceCount;
    private Double coOccurrenceStrength;
    
    // Default constructor
    public BlogTagCoOccurrenceResponse() {}
    
    // Constructor from BlogTags and co-occurrence count
    public BlogTagCoOccurrenceResponse(BlogTag tag1, BlogTag tag2, Long coOccurrenceCount) {
        this.tag1Id = tag1.getTagId();
        this.tag1Name = tag1.getName();
        this.tag2Id = tag2.getTagId();
        this.tag2Name = tag2.getName();
        this.coOccurrenceCount = coOccurrenceCount != null ? coOccurrenceCount : 0L;
        this.coOccurrenceStrength = null; // To be calculated if needed
    }
    
    // Constructor with all fields
    public BlogTagCoOccurrenceResponse(UUID tag1Id, String tag1Name, UUID tag2Id, String tag2Name, 
                                     Long coOccurrenceCount, Double coOccurrenceStrength) {
        this.tag1Id = tag1Id;
        this.tag1Name = tag1Name;
        this.tag2Id = tag2Id;
        this.tag2Name = tag2Name;
        this.coOccurrenceCount = coOccurrenceCount != null ? coOccurrenceCount : 0L;
        this.coOccurrenceStrength = coOccurrenceStrength;
    }
    
    // Static factory method
    public static BlogTagCoOccurrenceResponse create(BlogTag tag1, BlogTag tag2, Long coOccurrenceCount) {
        return new BlogTagCoOccurrenceResponse(tag1, tag2, coOccurrenceCount);
    }
    
    // Getters and Setters
    public UUID getTag1Id() {
        return tag1Id;
    }
    
    public void setTag1Id(UUID tag1Id) {
        this.tag1Id = tag1Id;
    }
    
    public String getTag1Name() {
        return tag1Name;
    }
    
    public void setTag1Name(String tag1Name) {
        this.tag1Name = tag1Name;
    }
    
    public UUID getTag2Id() {
        return tag2Id;
    }
    
    public void setTag2Id(UUID tag2Id) {
        this.tag2Id = tag2Id;
    }
    
    public String getTag2Name() {
        return tag2Name;
    }
    
    public void setTag2Name(String tag2Name) {
        this.tag2Name = tag2Name;
    }
    
    public Long getCoOccurrenceCount() {
        return coOccurrenceCount;
    }
    
    public void setCoOccurrenceCount(Long coOccurrenceCount) {
        this.coOccurrenceCount = coOccurrenceCount;
    }
    
    public Double getCoOccurrenceStrength() {
        return coOccurrenceStrength;
    }
    
    public void setCoOccurrenceStrength(Double coOccurrenceStrength) {
        this.coOccurrenceStrength = coOccurrenceStrength;
    }
    
    // Utility methods
    public String getCoOccurrenceDescription() {
        if (coOccurrenceCount == null || coOccurrenceCount == 0) {
            return "No co-occurrence";
        } else if (coOccurrenceCount == 1) {
            return "Used together once";
        } else {
            return "Used together " + coOccurrenceCount + " times";
        }
    }
    
    public String getRelationshipStrength() {
        if (coOccurrenceCount == null || coOccurrenceCount == 0) {
            return "None";
        } else if (coOccurrenceCount == 1) {
            return "Weak";
        } else if (coOccurrenceCount <= 3) {
            return "Moderate";
        } else if (coOccurrenceCount <= 6) {
            return "Strong";
        } else {
            return "Very Strong";
        }
    }
    
    public String getTagPairDisplay() {
        return tag1Name + " + " + tag2Name;
    }
    
    @Override
    public String toString() {
        return "BlogTagCoOccurrenceResponse{" +
                "tag1Name='" + tag1Name + '\'' +
                ", tag2Name='" + tag2Name + '\'' +
                ", coOccurrenceCount=" + coOccurrenceCount +
                ", coOccurrenceStrength=" + coOccurrenceStrength +
                '}';
    }
}
