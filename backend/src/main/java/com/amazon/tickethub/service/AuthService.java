package com.amazon.tickethub.service;

import com.amazon.tickethub.dto.auth.RegisterRequest;
import com.amazon.tickethub.entity.PasswordResetToken;
import com.amazon.tickethub.entity.Role;
import com.amazon.tickethub.entity.User;
import com.amazon.tickethub.exception.InvalidPasswordException;
import com.amazon.tickethub.exception.UserNotFoundException;
import com.amazon.tickethub.repository.PasswordResetTokenRepository;
import com.amazon.tickethub.repository.UserRepository;
import com.amazon.tickethub.security.JwtTokenProvider;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final EmailService emailService;
    public void register(@NotNull RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(Role.USER);
        userRepository.save(user);

//        emailService.sendEmail(
//                user.getEmail(),
//                "Welcome to TicketHub!",
//                "Hello " + user.getFirstName() + ",\n\nThanks for registering with TicketHub."
//        );
    }

    public String login(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return tokenProvider.generateToken(authentication);
        } catch (Exception e) {
            throw new InvalidPasswordException("Invalid email or password.");
        }
    }


    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("No user found with that email."));
    }

    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = java.util.UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(java.time.LocalDateTime.now().plusHours(1)); // token expires in 1 hour
        passwordResetTokenRepository.save(resetToken);

        String PASSWORD_RESET_STRING_LINK = "http://localhost:3000/reset-password?token=";
        String resetLink = PASSWORD_RESET_STRING_LINK + token;
        emailService.sendEmail(
                user.getEmail(),
                "Password Reset Request",
                "Hi " + user.getFirstName() + ",\n\nTo reset your password, click the link below:\n" + resetLink +
                        "\n\nIf you didn’t request this, ignore this email."
        );
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        if (resetToken.getExpiryDate().isBefore(java.time.LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);

        emailService.sendEmail(
                user.getEmail(),
                "Your Password Was Reset",
                "Hello " + user.getFirstName() + ",\n\nYour password was successfully reset."
        );
    }
}
