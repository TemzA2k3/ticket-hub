package com.amazon.tickethub.controller;

import com.amazon.tickethub.dto.contact.ContactFormDataDTO;
import com.amazon.tickethub.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<?> submitContactForm(@RequestBody @Valid ContactFormDataDTO contactFormDataDTO) {
        contactService.processContactForm(contactFormDataDTO);
        return ResponseEntity.ok(Map.of("message", "Contact form submitted successfully"));
    }
} 