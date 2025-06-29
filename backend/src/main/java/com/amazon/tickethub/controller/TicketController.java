package com.amazon.tickethub.controller;

import com.amazon.tickethub.dto.event.OrderRequestDTO;
import com.amazon.tickethub.dto.user.UserTicketResponseDTO;
import com.amazon.tickethub.service.TicketService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class TicketController {
    private final TicketService ticketService;

    @PostMapping("/orders")
    @Transactional(rollbackOn = Exception.class)
    public ResponseEntity<Map<String, Object>> placeOrder(@Valid @RequestBody OrderRequestDTO request,
                                                          @AuthenticationPrincipal UserDetails userDetails) {
        Map<String, Object> response = ticketService.processOrder(request, userDetails);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user-tickets")
    public List<UserTicketResponseDTO> getUserTickets(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) throw new RuntimeException("Authentication required");
        return ticketService.getDetailedUserTickets(userDetails.getUsername());
    }
} 