package com.amazon.tickethub.controller;

import com.amazon.tickethub.dto.user.UserProfileDTO;
import com.amazon.tickethub.dto.user.UserProfileDataDTO;
import com.amazon.tickethub.dto.user.LabeledValueDTO;
import com.amazon.tickethub.dto.user.UserDTO;
import com.amazon.tickethub.entity.User;
import com.amazon.tickethub.service.UserService;
import com.amazon.tickethub.service.FileUploadService;
import com.amazon.tickethub.service.mapper.UserMapper;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
public class UserController {

    private final UserService userService;
    private final FileUploadService fileUploadService;

    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers()
                .stream()
                .map(UserMapper::toDTO)
                .toList();
    }

    @GetMapping("/profile/{user_id}")
    public ResponseEntity<UserProfileDTO> getProfile(
            @PathVariable("user_id") Long userId,
            Authentication authentication
    ) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User authenticatedUser = userService.getByEmail(userDetails.getUsername());
        if (!authenticatedUser.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        UserProfileDTO dto = userService.getUserProfile(userId);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/profile/{user_id}")
    public ResponseEntity<?> updateProfile(
            @PathVariable("user_id") Long userId,
            @RequestBody List<UserProfileDataDTO> profileDataList,
            Authentication authentication
    ) {
        if (profileDataList == null || profileDataList.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Profile data is required"));
        }
        
        UserProfileDataDTO dto = profileDataList.getFirst();
        
        Map<String, String> validationErrors = userService.validateProfileData(dto);
        if (!validationErrors.isEmpty()) {
            return ResponseEntity.badRequest().body(validationErrors);
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User authenticatedUser = userService.getByEmail(userDetails.getUsername());
        if (!authenticatedUser.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        userService.updateUserProfile(userId, dto);

        List<LabeledValueDTO> personalInfo = userService.mapToPersonalInfoResponse(dto);
        return ResponseEntity.ok(personalInfo);
    }

    @PostMapping(value = "/profile/{user_id}/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadAvatar(
            @PathVariable("user_id") Long userId,
            @RequestPart("avatar") MultipartFile avatar,
            Authentication authentication
    ) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User authenticatedUser = userService.getByEmail(userDetails.getUsername());
        if (!authenticatedUser.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        String avatarUrl;
        try {
            avatarUrl = fileUploadService.uploadAvatar(avatar);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }

        authenticatedUser.setAvatarUrl(avatarUrl);
        userService.save(authenticatedUser);

        return ResponseEntity.ok(Map.of("avatarUrl", avatarUrl));
    }
}

