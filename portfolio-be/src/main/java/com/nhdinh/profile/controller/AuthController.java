// package com.nhdinh.profile.controller;

// import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.nhdinh.profile.dto.AuthRequest;
// import com.nhdinh.profile.dto.AuthResponse;
// import com.nhdinh.profile.dto.UserDTO;
// import com.nhdinh.profile.model.Role;
// import com.nhdinh.profile.model.User;
// import com.nhdinh.profile.repository.RoleRepository;
// import com.nhdinh.profile.repository.UserRepository;
// import com.nhdinh.profile.security.CustomUserDetailsService;
// import com.nhdinh.profile.security.JwtUtils;

// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/api/auth")
// @RequiredArgsConstructor
// public class AuthController {

//     private final AuthenticationManager authManager;
//     private final CustomUserDetailsService uds;
//     private final JwtUtils jwt;
//     private final PasswordEncoder pe;
//     private final UserRepository userRepo;
//     private final RoleRepository roleRepo;

//     @PostMapping("/signin")
//     public ResponseEntity<AuthResponse> signin(@RequestBody @Valid AuthRequest req) {
//         Neo4jProperties.Authentication a = new UsernamePasswordAuthenticationToken(req.username(), req.password());
//         authManager.authenticate(a);
//         UserDetails ud = uds.loadUserByUsername(req.username());
//         String token = jwt.generateToken(ud);
//         return ResponseEntity.ok(new AuthResponse(token, 3600000));
//     }

//     @PostMapping("/signup")
//     public ResponseEntity<?> signup(@RequestBody @Valid UserDTO dto) {
//         if (userRepo.existsByUsername(dto.username())
//                 || userRepo.existsByEmail(dto.email())) {
//             return ResponseEntity.badRequest().body(Map.of("message","Username/Email existed"));
// }
// Role role = roleRepo.findByName("ROLE_USER").orElseGet(()
//                 -> roleRepo.save(Role.builder().name("ROLE_USER").build()));
//         User u
//                 = User.builder().username(dto.username()).email(dto.email()).password(pe.encode(dto.password()))
//         userRepo.save(u);
//         return ResponseEntity.ok(Map.of("message", "Created"));
//     }
// }
