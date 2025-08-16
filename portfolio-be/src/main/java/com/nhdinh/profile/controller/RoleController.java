package com.nhdinh.profile.controller;

import com.nhdinh.profile.model.Role;
import com.nhdinh.profile.repository.RoleRepository;
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
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {
    
    private final RoleRepository roleRepository;
    
    @GetMapping
    public ResponseEntity<Page<Role>> getAllRoles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Role> rolePage = roleRepository.findAll(pageable);
        
        return ResponseEntity.ok(rolePage);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Role>> getAllRolesSimple() {
        Sort sort = Sort.by("createdAt").descending();
        List<Role> roles = roleRepository.findAll(sort);
        
        return ResponseEntity.ok(roles);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable UUID id) {
        Optional<Role> role = roleRepository.findById(id);
        return role.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/name/{name}")
    public ResponseEntity<Role> getRoleByName(@PathVariable String name) {
        Optional<Role> role = roleRepository.findByName(name);
        return role.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
}
