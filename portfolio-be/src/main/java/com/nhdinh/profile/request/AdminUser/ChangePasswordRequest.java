package com.nhdinh.profile.request.AdminUser;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

public class ChangePasswordRequest {
    
    @NotBlank(message = "Current password is required")
    private String currentPassword;
    
    @NotBlank(message = "New password is required")
    @Size(min = 8, max = 100, message = "New password must be between 8 and 100 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&].*$", 
             message = "New password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character")
    private String newPassword;
    
    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;
    
    public ChangePasswordRequest() {
    }
    
    public ChangePasswordRequest(String currentPassword, String newPassword, String confirmPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
    
    // Getters and Setters
    public String getCurrentPassword() {
        return currentPassword;
    }
    
    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }
    
    public String getNewPassword() {
        return newPassword;
    }
    
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
    
    public String getConfirmPassword() {
        return confirmPassword;
    }
    
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
    
    // Validation method
    public boolean isPasswordMatching() {
        return newPassword != null && newPassword.equals(confirmPassword);
    }
    
    @Override
    public String toString() {
        return "ChangePasswordRequest{" +
                "currentPassword='[HIDDEN]'" +
                ", newPassword='[HIDDEN]'" +
                ", confirmPassword='[HIDDEN]'" +
                '}';
    }
}
