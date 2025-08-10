// package com.nhdinh.profile.config;

// import java.beans.Customizer;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import com.nhdinh.profile.security.CustomUserDetailsService;
// import com.nhdinh.profile.security.JwtAuthFilter;

// import lombok.RequiredArgsConstructor;


// @Configuration
// @EnableMethodSecurity



// @RequiredArgsConstructor
// public class SecurityConfig {

//     private final JwtAuthFilter jwtAuthFilter;
//     private final CustomUserDetailsService uds;

//     @Bean
//     public AuthenticationManager
//             authenticationManager(AuthenticationConfiguration cfg) throws Exception {
//         return cfg.getAuthenticationManager();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http.csrf(csrf -> csrf.disable())
//                 .cors(Customizer.withDefaults())
//                 .sessionManagement(sm
//                         -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                 .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/api/auth/**", "/actuator/health").permitAll()
//                 .anyRequest().authenticated()
//                 )
//                 .userDetailsService(uds)
//                 .addFilterBefore(jwtAuthFilter,
//                         UsernamePasswordAuthenticationFilter.class);
//         return http.build();
//     }
// }
