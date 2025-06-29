package com.amazon.tickethub.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PasswordResetRequest {
    @NotBlank
    private String token;
    @NotBlank
    private String newPassword;
}
