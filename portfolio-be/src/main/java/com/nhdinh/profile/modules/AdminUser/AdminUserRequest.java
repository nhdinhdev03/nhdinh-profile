package com.nhdinh.profile.modules.AdminUser;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AdminUserRequest {
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid phone number format")
    private String phoneNumber;
    
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
    private String username;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&].*$", 
             message = "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character")
    private String password;
    
    @Size(max = 100, message = "Full name must not exceed 100 characters")
    private String fullName;
    
    public AdminUserRequest() {
    }
    
    public AdminUserRequest(String phoneNumber, String password) {
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
    
    public AdminUserRequest(String phoneNumber, String username, String password, String fullName) {
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
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
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    @Override
    public String toString() {
        return "AdminUserRequest{" +
                "phoneNumber='" + phoneNumber + '\'' +
                ", username='" + username + '\'' +
                ", fullName='" + fullName + '\'' +
                '}';
    }
}
