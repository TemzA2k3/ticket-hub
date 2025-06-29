package com.amazon.tickethub.dto.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactFormDataDTO {
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be up to 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Subject is required")
    @Size(max = 150, message = "Subject must be up to 150 characters")
    private String subject;

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must be up to 50 characters")
    private String category;

    @NotBlank(message = "Message is required")
    @Size(max = 2000, message = "Message must be up to 2000 characters")
    private String message;
} 