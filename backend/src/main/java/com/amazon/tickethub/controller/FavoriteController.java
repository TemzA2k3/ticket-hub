package com.amazon.tickethub.controller;

import com.amazon.tickethub.dto.event.FavoriteEventDTO;
import com.amazon.tickethub.service.FavoriteService;
import com.amazon.tickethub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorite-events")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final UserService userService;

    @PostMapping("/{eventId}")
    public ResponseEntity<Void> addToFavorites(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long eventId) {
        Long userId = userService.getUserIdByEmail(userDetails.getUsername());
        favoriteService.addToFavorites(userId, eventId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> removeFromFavorites(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long eventId) {
        Long userId = userService.getUserIdByEmail(userDetails.getUsername());
        favoriteService.removeFromFavourites(userId, eventId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<FavoriteEventDTO>> getFavoriteEvents(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = userService.getUserIdByEmail(userDetails.getUsername());
        return ResponseEntity.ok(favoriteService.getFavoriteEvents(userId));
    }
}