package com.nhdinh.nhdinh_profile.auth.util;

import java.security.SecureRandom;
import java.util.Base64;

public class SecurityUtils {
    
    private static final SecureRandom secureRandom = new SecureRandom();
    
    /**
     * Generate a secure random JWT secret key
     */
    public static String generateSecretKey() {
        byte[] key = new byte[64]; // 512 bits
        secureRandom.nextBytes(key);
        return Base64.getEncoder().encodeToString(key);
    }
    
    /**
     * Check if password meets security requirements
     */
    public static boolean isPasswordValid(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        
        boolean hasUpper = false;
        boolean hasLower = false;
        boolean hasDigit = false;
        
        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) hasUpper = true;
            if (Character.isLowerCase(c)) hasLower = true;
            if (Character.isDigit(c)) hasDigit = true;
        }
        
        return hasUpper && hasLower && hasDigit;
    }
    
    /**
     * Sanitize user input
     */
    public static String sanitizeInput(String input) {
        if (input == null) return null;
        return input.trim().replaceAll("[<>\"']", "");
    }
}
