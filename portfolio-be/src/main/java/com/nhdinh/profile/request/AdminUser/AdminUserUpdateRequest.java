package com.nhdinh.profile.request.AdminUser;


import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AdminUserUpdateRequest {
    
    @Pattern(regexp = "^[+]?\\d{10,15}$", message = "Invalid phone number format")
    private String phoneNumber;
    
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Pattern(regexp = "^\\w+$", message = "Username can only contain letters, numbers, and underscores")
    private String username;
    
    @Size(max = 100, message = "Full name must not exceed 100 characters")
    private String fullName;
    
    public AdminUserUpdateRequest() {
    }
    
    public AdminUserUpdateRequest(String phoneNumber, String username, String fullName) {
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.fullName = fullName;
    }
    
    // Getters and Setters
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    @Override
    public String toString() {
        return "AdminUserUpdateRequest{" +
                "phoneNumber='" + phoneNumber + '\'' +
                ", username='" + username + '\'' +
                ", fullName='" + fullName + '\'' +
                '}';
    }
}
