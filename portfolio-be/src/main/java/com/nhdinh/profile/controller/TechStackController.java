package com.nhdinh.profile.controller;

import com.nhdinh.profile.model.TechStack;
import com.nhdinh.profile.repository.TechStackRepository;
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
@RequestMapping("/api/techstacks")
@RequiredArgsConstructor
public class TechStackController {
    
    private final TechStackRepository techStackRepository;
    
    @GetMapping
    public ResponseEntity<Page<TechStack>> getAllTechStacks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<TechStack> techStackPage = techStackRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(techStackPage);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<TechStack>> getAllTechStacksSimple() {
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        Page<TechStack> techStackPage = techStackRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(techStackPage.getContent());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TechStack> getTechStackById(@PathVariable UUID id) {
        Optional<TechStack> techStack = techStackRepository.findByIdActive(id);
        return techStack.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/slug/{slug}")
    public ResponseEntity<TechStack> getTechStackBySlug(@PathVariable String slug) {
        Optional<TechStack> techStack = techStackRepository.findBySlug(slug);
        return techStack.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/name/{name}")
    public ResponseEntity<TechStack> getTechStackByName(@PathVariable String name) {
        Optional<TechStack> techStack = techStackRepository.findByName(name);
        return techStack.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<TechStack>> getTechStacksByCategory(@PathVariable String category) {
        List<TechStack> techStacks = techStackRepository.findByCategory(category);
        return ResponseEntity.ok(techStacks);
    }
}
