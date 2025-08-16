package com.nhdinh.profile.controller;

import com.nhdinh.profile.model.Media;
import com.nhdinh.profile.repository.MediaRepository;
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
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {
    
    private final MediaRepository mediaRepository;
    
    @GetMapping
    public ResponseEntity<Page<Media>> getAllMedia(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Media> mediaPage = mediaRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(mediaPage);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Media>> getAllMediaSimple() {
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        Page<Media> mediaPage = mediaRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(mediaPage.getContent());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Media> getMediaById(@PathVariable UUID id) {
        Optional<Media> media = mediaRepository.findByIdActive(id);
        return media.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/type/{mediaType}")
    public ResponseEntity<Page<Media>> getMediaByType(
            @PathVariable Media.MediaType mediaType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Media> mediaPage = mediaRepository.findByMediaType(mediaType, pageable);
        
        return ResponseEntity.ok(mediaPage);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Media>> searchMediaByFileName(@RequestParam String fileName) {
        List<Media> mediaList = mediaRepository.findByFileNameContaining(fileName);
        return ResponseEntity.ok(mediaList);
    }
    
    @PostMapping
    public ResponseEntity<Media> createMedia(@RequestBody Media media) {
        Media savedMedia = mediaRepository.save(media);
        return ResponseEntity.ok(savedMedia);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Media> updateMedia(@PathVariable UUID id, @RequestBody Media media) {
        Optional<Media> existingMedia = mediaRepository.findByIdActive(id);
        if (existingMedia.isPresent()) {
            media.setId(id);
            Media updatedMedia = mediaRepository.save(media);
            return ResponseEntity.ok(updatedMedia);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable UUID id) {
        Optional<Media> media = mediaRepository.findByIdActive(id);
        if (media.isPresent()) {
            Media mediaToDelete = media.get();
            mediaToDelete.setIsDeleted(true);
            mediaRepository.save(mediaToDelete);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
