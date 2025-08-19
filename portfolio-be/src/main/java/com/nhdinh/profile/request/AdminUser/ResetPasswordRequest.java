package com.nhdinh.profile.request.AdminUser;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

public class ResetPasswordRequest {
    
    @NotBlank(message = "New password is required")
    @Size(min = 8, max = 100, message = "New password must be between 8 and 100 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&].*$", 
             message = "New password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character")
    private String newPassword;
    
    public ResetPasswordRequest() {
    }
    
    public ResetPasswordRequest(String newPassword) {
        this.newPassword = newPassword;
    }
    
    // Getters and Setters
    public String getNewPassword() {
        return newPassword;
    }
    
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
    
    @Override
    public String toString() {
        return "ResetPasswordRequest{" +
                "newPassword='[HIDDEN]'" +
                '}';
    }
}
