package com.nhdinh.profile.controller;

import com.nhdinh.profile.model.Permission;
import com.nhdinh.profile.repository.PermissionRepository;
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
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
public class PermissionController {
    
    private final PermissionRepository permissionRepository;
    
    @GetMapping
    public ResponseEntity<Page<Permission>> getAllPermissions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Permission> permissionPage = permissionRepository.findAll(pageable);
        
        return ResponseEntity.ok(permissionPage);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Permission>> getAllPermissionsSimple() {
        Sort sort = Sort.by("createdAt").descending();
        List<Permission> permissions = permissionRepository.findAll(sort);
        
        return ResponseEntity.ok(permissions);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Permission> getPermissionById(@PathVariable UUID id) {
        Optional<Permission> permission = permissionRepository.findById(id);
        return permission.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/code/{code}")
    public ResponseEntity<Permission> getPermissionByCode(@PathVariable String code) {
        Optional<Permission> permission = permissionRepository.findByCode(code);
        return permission.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/group/{groupName}")
    public ResponseEntity<List<Permission>> getPermissionsByGroup(@PathVariable String groupName) {
        List<Permission> permissions = permissionRepository.findByGroupName(groupName);
        return ResponseEntity.ok(permissions);
    }
}
