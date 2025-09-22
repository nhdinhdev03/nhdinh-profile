package com.nhdinh.nhdinh_profile.constants;

/**
 * API Constants for centralized endpoint management
 * This class contains all API version and endpoint constants
 * to make version management and maintenance easier
 */
public final class ApiConstants {
    
    private ApiConstants() {
        // Private constructor to prevent instantiation
    }
    
    // API Version
    public static final String API_VERSION = "v2";
    public static final String API_BASE = "/api/" + API_VERSION;
    
    // Base Endpoints
    public static final String API_PUBLIC = "/api/public";
    public static final String API_AUTH = "/api/auth";
    
    // Module Endpoints
    public static final String ADMIN_USERS = API_BASE + "/admin-users";
    public static final String HEROES = API_BASE + "/heroes";
    public static final String PROFILE = API_BASE + "/profile";
    public static final String EXPERIENCES = API_BASE + "/experiences";
    public static final String SKILLS = API_BASE + "/skills";
    public static final String SKILL_CATEGORIES = API_BASE + "/skill-categories";
    public static final String PROJECTS = API_BASE + "/projects";
    public static final String BLOG_POSTS = API_BASE + "/blog-posts";
    public static final String CONTACT_MESSAGES = API_BASE + "/contact-messages";
    
    // Admin Endpoints
    public static final String ADMIN_BASE = API_BASE + Paths.ADMIN;
    
    // Security Patterns (for WebSecurity configuration)
    public static final class Security {
        private Security() {}
        
        // Public endpoints patterns
        public static final String PUBLIC_PATTERN = API_PUBLIC + "/**";
        public static final String AUTH_PATTERN = API_AUTH + "/**";
        public static final String HEROES_PATTERN = HEROES + "/**";
        public static final String PROFILE_PATTERN = PROFILE + "/**";
        public static final String EXPERIENCES_PATTERN = EXPERIENCES + "/**";
        public static final String SKILLS_PATTERN = SKILLS + "/**";
        public static final String SKILL_CATEGORIES_PATTERN = SKILL_CATEGORIES + "/**";
        public static final String PROJECTS_PATTERN = PROJECTS + "/**";
        public static final String BLOG_POSTS_PATTERN = BLOG_POSTS + "/**";
        public static final String CONTACT_MESSAGES_PATTERN = CONTACT_MESSAGES + "/**";
        
        // Admin endpoints patterns
        public static final String ADMIN_PATTERN = ADMIN_BASE + "/**";
        public static final String ADMIN_USERS_PATTERN = ADMIN_USERS + "/**";
    }
    
    // Endpoint paths for specific actions (if needed)
    public static final class Paths {
        private Paths() {}
        
        // Common sub-paths
        public static final String BY_ID = "/{id}";
        public static final String BY_PHONE = "/phone/{phoneNumber}";
        public static final String BY_USERNAME = "/username/{username}";
        public static final String BY_LANGUAGE = "/language/{languageCode}";
        public static final String BY_LANGUAGE_PARAM = "/by-language";
        public static final String FIRST = "/first";
        
        // Admin specific paths
        public static final String ADMIN = "/admin";
    }
    
    // HTTP Methods (if needed for documentation)
    public static final class Methods {
        private Methods() {}
        
        public static final String GET = "GET";
        public static final String POST = "POST";
        public static final String PUT = "PUT";
        public static final String DELETE = "DELETE";
        public static final String PATCH = "PATCH";
        public static final String OPTIONS = "OPTIONS";
    }
}