// package com.nhdinh.profile.controller;

// import java.util.Map;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.nhdinh.profile.dto.ContactDTO;
// import com.nhdinh.profile.service.ContactService;

// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/api/contact")
// @RequiredArgsConstructor
// public class ContactController {

//     private final ContactService service;

//     @PostMapping
//     public ResponseEntity<?> send(@RequestBody @Valid ContactDTO dto) {
//         service.save(dto);
//         return ResponseEntity.ok(Map.of("message", "OK"));
//     }
// }
