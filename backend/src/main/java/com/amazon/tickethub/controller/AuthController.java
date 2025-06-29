package com.amazon.tickethub.controller;

import com.amazon.tickethub.dto.auth.AuthResponse;
import com.amazon.tickethub.dto.auth.LoginRequest;
import com.amazon.tickethub.dto.auth.PasswordResetRequest;
import com.amazon.tickethub.dto.auth.RegisterRequest;
import com.amazon.tickethub.entity.User;
import com.amazon.tickethub.security.JwtTokenProvider;
import com.amazon.tickethub.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {

    private final AuthService authService;
    private final JwtTokenProvider tokenProvider;

    @Operation(summary = "Register user", description = "Registers a new user and returns status")
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);

        Map<String, Object> response = new HashMap<>();
        response.put("registered", true);

        return ResponseEntity.ok(response);
    }


    @Operation(summary = "Login user", description = "Authenticates a user and returns a JWT token")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = authService.getByEmail(request.getEmail());
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.isVerified(),
                user.getAvatarUrl()
        ));
    }

    @Operation(summary = "Request password reset", description = "Sends a password reset email")
    @PostMapping("/reset-password")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
        authService.requestPasswordReset(email);
        return ResponseEntity.ok("Password reset link sent if email exists.");
    }

    @Operation(summary = "Confirm password reset", description = "Sets a new password using a valid reset token")
    @PostMapping("/reset-password/confirm")
    public ResponseEntity<String> confirmResetPassword(@RequestBody PasswordResetRequest request) {
        authService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Password has been reset.");
    }

    @GetMapping("/get_current_user")
    public ResponseEntity<?> getUserDataFromToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        if (!tokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        String email = tokenProvider.getUsernameFromToken(token);
        User user = authService.getByEmail(email);

        return ResponseEntity.ok(new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.isVerified(),
                user.getAvatarUrl()
        ));
    }
}
