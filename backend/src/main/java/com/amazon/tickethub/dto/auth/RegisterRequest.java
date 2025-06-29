package com.amazon.tickethub.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String password;
    @NotBlank
    private String firstName;
    private String lastName;

    @NotBlank
    @Email(message = "Invalid email format")
    private String email;
}
