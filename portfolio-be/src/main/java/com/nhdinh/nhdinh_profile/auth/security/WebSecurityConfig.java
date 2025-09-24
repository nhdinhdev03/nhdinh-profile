package com.nhdinh.nhdinh_profile.auth.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.nhdinh.nhdinh_profile.auth.security.jwt.AuthEntryPointJwt;
import com.nhdinh.nhdinh_profile.auth.security.jwt.AuthTokenFilter;
import com.nhdinh.nhdinh_profile.auth.security.user.service.AdminUserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    @Autowired
    AdminUserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        // Public endpoints - không cần authentication
                        .requestMatchers("/api/public/**").permitAll()

                        // Auth endpoints - login, signup, etc.
                        .requestMatchers("/api/auth/**").permitAll()

                        // Core portfolio endpoints - public read access
                        .requestMatchers("/api/v2/heroes/**").permitAll()
                        .requestMatchers("/api/v2/profile/**").permitAll()
                        .requestMatchers("/api/v2/experiences/**").permitAll()
                        .requestMatchers("/api/v2/skills/**").permitAll()
                        .requestMatchers("/api/v2/skill-categories/**").permitAll()
                        .requestMatchers("/api/v2/projects/**").permitAll()
                        .requestMatchers("/api/v2/blog-posts/**").permitAll()

                        // Contact messages - allow POST for public contact form
                        .requestMatchers("/api/v2/contact-messages/**").permitAll()
                        .requestMatchers("/api/v2/contact-messages/send").permitAll()

                        // Admin endpoints - require authentication
                        .requestMatchers("/api/v2/admin/**").authenticated()
                        .requestMatchers("/api/v2/admin-users/**").authenticated()

                        // Contact messages admin operations - require authentication
                        // .requestMatchers("/api/v2/contact-messages/**").authenticated()

                        // Static resources and error pages
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/favicon.ico").permitAll()
                        // .requestMatchers("/actuator/health").permitAll()

                        // Default - permit all for now, can be changed to authenticated() later
                        .anyRequest().permitAll());

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
