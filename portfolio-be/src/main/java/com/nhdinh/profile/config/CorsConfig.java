// package com.nhdinh.profile.config;

// import java.util.Arrays;
// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import lombok.Value;

// @Configuration
// public class CorsConfig {

//     @Value("${cors.allowed-origins}")
//     private String origins;

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration cfg = new CorsConfiguration();
//         cfg.setAllowedOrigins(Arrays.asList(origins.split(",")));
//         cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
//         cfg.setAllowedHeaders(List.of("Authorization", "Content-Type"));
//         cfg.setAllowCredentials(true);
//         UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
//         src.registerCorsConfiguration("/**", cfg);
//         return src;
//     }
// }
