package com.nhdinh.profile.modules.AdminUser;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    
    @NotBlank(message = "Identifier (phone number or username) is required")
    private String identifier;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    public LoginRequest() {
    }
    
    public LoginRequest(String identifier, String password) {
        this.identifier = identifier;
        this.password = password;
    }
    
    // Getters and Setters
    public String getIdentifier() {
        return identifier;
    }
    
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    @Override
    public String toString() {
        return "LoginRequest{" +
                "identifier='" + identifier + '\'' +
                ", password='[HIDDEN]'" +
                '}';
    }
}
