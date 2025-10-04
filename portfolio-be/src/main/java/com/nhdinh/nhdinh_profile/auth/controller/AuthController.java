package com.nhdinh.nhdinh_profile.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhdinh.nhdinh_profile.auth.payload.request.LoginRequest;
import com.nhdinh.nhdinh_profile.auth.payload.request.SignupRequest;
import com.nhdinh.nhdinh_profile.auth.payload.response.JwtResponse;
import com.nhdinh.nhdinh_profile.auth.payload.response.MessageResponse;
import com.nhdinh.nhdinh_profile.auth.security.jwt.JwtUtils;
import com.nhdinh.nhdinh_profile.auth.security.service.AdminUserDetailsImpl;
import com.nhdinh.nhdinh_profile.modules.AdminUser.AdminUser;
import com.nhdinh.nhdinh_profile.modules.AdminUser.AdminUserDAO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminUserDAO adminUserDAO;

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            // Check if phone number already exists
            if (adminUserDAO.existsByPhoneNumber(signUpRequest.getPhoneNumber())) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Error: Phone number is already taken!"));
            }

            // Check if username already exists (if provided)
            if (signUpRequest.getUsername() != null && !signUpRequest.getUsername().trim().isEmpty()) {
                if (adminUserDAO.existsByUsername(signUpRequest.getUsername())) {
                    return ResponseEntity.badRequest()
                            .body(new MessageResponse("Error: Username is already taken!"));
                }
            }

            // Create new admin user
            AdminUser user = new AdminUser();
            user.setPhoneNumber(signUpRequest.getPhoneNumber());
            user.setUsername(signUpRequest.getUsername());
            user.setPasswordHash(passwordEncoder.encode(signUpRequest.getPassword()));
            user.setFullName(signUpRequest.getFullName());
            user.setIsActive(true);

            adminUserDAO.save(user);

            return ResponseEntity.ok(new MessageResponse("Admin user registered successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            loginRequest.getIdentifier(),
                            loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            AdminUserDetailsImpl userDetails = (AdminUserDetailsImpl) authentication.getPrincipal();

            return ResponseEntity.ok(new JwtResponse(
                    jwt,
                    userDetails.getId(),
                    userDetails.getPhoneNumber(),
                    userDetails.getUsername(),
                    userDetails.getFullName(),
                    "ROLE_ADMIN"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Error: Invalid credentials!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(new MessageResponse("User logged out successfully!"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()
                && !"anonymousUser".equals(authentication.getPrincipal())) {

            AdminUserDetailsImpl userDetails = (AdminUserDetailsImpl) authentication.getPrincipal();

            return ResponseEntity.ok(new JwtResponse(
                    null, // Don't return token in profile response
                    userDetails.getId(),
                    userDetails.getPhoneNumber(),
                    userDetails.getUsername(),
                    userDetails.getFullName(),
                    "ROLE_ADMIN"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse("Error: User not authenticated!"));
    }
}
