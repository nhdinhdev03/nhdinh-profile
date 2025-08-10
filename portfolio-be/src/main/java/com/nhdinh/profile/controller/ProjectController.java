// package com.nhdinh.profile.controller;

// import java.util.List;

// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;

// import org.springframework.web.bind.annotation.RequestMapping;

// import com.nhdinh.profile.dto.ProjectDTO;

// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;

// @RequiredArgsConstructor
// @RestController
// @RequestMapping("/api/projects")
// public class ProjectController {

//     private final ProjectService service;

//     @GetMapping
//     public List<ProjectDTO> all() {
//         return service.getAll();
//     }

//     @PostMapping
//     @PreAuthorize("hasRole('ADMIN')")
//     public ProjectDTO create(@RequestBody @Valid ProjectDTO dto) {
//         return service.create(dto);
//     }

//     @GetMapping("/{id}")
//     public ProjectDTO get(@PathVariable Long id) {
//         return service.get(id);
//     }
// }
