package com.nhdinh.profile.controller;

import com.nhdinh.profile.model.User;
import com.nhdinh.profile.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<Page<User>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<User> userPage = userRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(userPage);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsersSimple() {
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        Page<User> userPage = userRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(userPage.getContent());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        Optional<User> user = userRepository.findByIdActive(id);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<User>> getUsersByStatus(
            @PathVariable Integer status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findByStatus(status, pageable);
        
        return ResponseEntity.ok(userPage);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().build(); // Username already exists
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().build(); // Email already exists
        }
        
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable UUID id, @RequestBody User user) {
        Optional<User> existingUser = userRepository.findByIdActive(id);
        if (existingUser.isPresent()) {
            user.setId(id);
            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        Optional<User> user = userRepository.findByIdActive(id);
        if (user.isPresent()) {
            User userToDelete = user.get();
            userToDelete.setIsDeleted(true);
            userRepository.save(userToDelete);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
