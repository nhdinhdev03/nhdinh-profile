package com.nhdinh.profile.request.BlogTag;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class BlogTagRequest {
    
    @NotBlank(message = "Tag name is required")
    @Size(max = 50, message = "Tag name must not exceed 50 characters")
    private String name;
    
    // Default constructor
    public BlogTagRequest() {}
    
    // Constructor
    public BlogTagRequest(String name) {
        this.name = name;
    }
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    @Override
    public String toString() {
        return "BlogTagRequest{" +
                "name='" + name + '\'' +
                '}';
    }
}
