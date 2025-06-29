package com.amazon.tickethub.controller;

import com.amazon.tickethub.dto.event.*;
import com.amazon.tickethub.entity.Event;
import com.amazon.tickethub.repository.EventRepository;
import com.amazon.tickethub.service.EventQueryService;
import com.amazon.tickethub.service.EventService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
public class EventController {

    private final EventRepository eventRepository;
    private final EventQueryService eventQueryService;
    private final EventService eventService;
    private final ObjectMapper objectMapper;

    @Operation(summary = "Delete event by ID")
    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "List all events")
    @GetMapping("/events/all")
    public List<EventDTO> getAllEvents() {
        return eventQueryService.getAllEvents();
    }

    @Operation(summary = "Get full event details by ID")
    @GetMapping("/events/{id}")
    public ResponseEntity<FullEventDetailsDTO> getEventDetails(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String userEmail = userDetails != null ? userDetails.getUsername() : null;
        return eventQueryService.getFullEventDetails(id, userEmail)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Filter events by category and time")
    @GetMapping("/events")
    public ResponseEntity<Map<String, Object>> getFilteredEvents(
            @RequestParam int page,
            @RequestParam(required = false) String name,
            @RequestParam(required = false, defaultValue = "all_categories") String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String date,
            @RequestParam(required = false, defaultValue = "upcoming") String time
    ) {
        return ResponseEntity.ok(
                eventQueryService.getFilteredEvents(page, name, category, location, date, time)
        );
    }

    @PreAuthorize("hasRole('VERIFIED') or hasRole('ADMIN')")
    @PostMapping(value = "/create_event", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @ModelAttribute CreateEventRequest eventData,
            @RequestPart MultipartFile image,
            @RequestParam String ticketTypes
    ) throws IOException {

        List<TicketRequest> ticketList = objectMapper.readValue(ticketTypes, new TypeReference<>() {
        });

        try {
            Event saved = eventService.createEventWithValidation(
                    userDetails.getUsername(),
                    eventData,
                    image,
                    ticketList
            );
            return ResponseEntity.ok(saved);
        } catch (ResponseStatusException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getReason()));
        }
    }

    @Operation(summary = "Get featured events")
    @GetMapping("/featured-events")
    public List<FeaturedEventDTO> getFeaturedEvents() {
        return eventQueryService.getFeaturedEvents();
    }

    @Operation(summary = "Get upcoming events")
    @GetMapping("/upcoming")
    public List<UpcomingEventDTO> getUpcomingEvents() {
        return eventQueryService.getUpcomingEvents();
    }
}
