package com.amazon.tickethub.service;

import com.amazon.tickethub.dto.event.OrderRequestDTO;
import com.amazon.tickethub.dto.user.UserTicketResponseDTO;
import com.amazon.tickethub.entity.*;
import com.amazon.tickethub.exception.TicketSaleClosedException;
import com.amazon.tickethub.exception.TicketUnavailableException;
import com.amazon.tickethub.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final EventRepository eventRepository;
    private final EventTicketRepository eventTicketRepository;
    private final EmailService emailService;

    public Map<String, Object> processOrder(OrderRequestDTO request, UserDetails userDetails) {
        if (userDetails == null) throw new RuntimeException("Authentication required");
        validateRequest(request);

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        EventTicket ticketType = event.getTickets().stream()
                .filter(t -> t.getName().equals(request.getTicket().getName()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Ticket type not found"));

        validateSaleWindow(ticketType);
        validateQuantity(ticketType, request.getQuantity());

        ticketType.setQuantity(ticketType.getQuantity() - request.getQuantity());
        eventTicketRepository.save(ticketType);

        createTickets(user, event, ticketType, request.getQuantity());

        // String emailContent = buildOrderConfirmationEmail(request, ticketType, event);
        // emailService.sendEmail(request.getEmail(), "Your TicketHub Order Confirmation", emailContent);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Tickets purchased successfully");
        response.put("quantity", request.getQuantity());
        response.put("ticketType", ticketType.getName());
        response.put("eventTitle", event.getTitle());
        response.put("totalAmount", request.getTotal());
        response.put("orderId", "ORD-" + System.currentTimeMillis());

        return response;
    }

    private void validateRequest(OrderRequestDTO request) {
        if (request.getEventId() == null) throw new RuntimeException("Event ID is required");
        if (request.getTicket() == null || request.getTicket().getName() == null)
            throw new RuntimeException("Ticket information is required");
        if (request.getQuantity() <= 0) throw new RuntimeException("Quantity must be greater than 0");
    }

    private void validateSaleWindow(EventTicket ticketType) {
        LocalDateTime now = LocalDateTime.now();
        if (ticketType.getSaleStart() != null && now.isBefore(ticketType.getSaleStart()))
            throw new TicketSaleClosedException("Sale hasn't started yet");
        if (ticketType.getSaleEnd() != null && now.isAfter(ticketType.getSaleEnd()))
            throw new TicketSaleClosedException("Sale has ended");
    }

    private void validateQuantity(EventTicket ticketType, int quantity) {
        if (ticketType.getQuantity() < quantity)
            throw new TicketUnavailableException("Not enough tickets available");
    }

    public void createTickets(User user, Event event, EventTicket type, int quantity) {
        for (int i = 0; i < quantity; i++) {
            Ticket ticket = Ticket.builder()
                    .user(user)
                    .event(event)
                    .eventTicket(type)
                    .confirmed(true)
                    .build();
            ticketRepository.save(ticket);
        }
    }

    public List<UserTicketResponseDTO> getDetailedUserTickets(String email) {
        log.info("Fetching detailed tickets for user: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Ticket> tickets = ticketRepository.findByUserWithAllRelations(user);
        log.info("Found {} tickets for user {}", tickets.size(), email);

        // Validate tickets before processing
        for (Ticket ticket : tickets) {
            if (ticket.getEvent() == null) {
                log.error("Ticket {} has null event", ticket.getId());
                throw new RuntimeException("Invalid ticket data: missing event");
            }
            if (ticket.getEventTicket() == null) {
                log.error("Ticket {} has null eventTicket", ticket.getId());
                throw new RuntimeException("Invalid ticket data: missing event ticket");
            }
        }

        return tickets.stream()
                .map(ticket -> mapToResponse(ticket, user))
                .toList();
    }

    private String generateTicketId(Event event, Long ticketId) {
        String title = event.getTitle();
        if (title == null || title.isBlank()) return "T-" + ticketId;
        String[] words = title.split("[\\s\\-]+");
        StringBuilder sb = new StringBuilder();
        for (String word : words) {
            if (!word.isEmpty()) sb.append(Character.toUpperCase(word.charAt(0)));
        }
        return sb + "-" + ticketId;
    }

    private UserTicketResponseDTO mapToResponse(Ticket ticket, User user) {
        Event event = ticket.getEvent();
        EventTicket ticketType = ticket.getEventTicket();

        if (event == null || ticketType == null)
            throw new RuntimeException("Invalid ticket data");

        String startDate = formatDate(event.getStartTime());
        String endDate = event.getEndTime() != null ? formatDate(event.getEndTime()) : startDate;
        String startTime = formatTime(event.getStartTime());
        String endTime = event.getEndTime() != null ? formatTime(event.getEndTime()) : "";

        boolean isFavorite = favoriteRepository.existsByUserIdAndEventId(user.getId(), event.getId());

        return UserTicketResponseDTO.builder()
                .id(generateTicketId(event, ticket.getId()))
                .title(Optional.ofNullable(event.getTitle()).orElse(""))
                .image(Optional.ofNullable(event.getImageUrl()).orElse(""))
                .badge(Optional.ofNullable(event.getBadge()).orElse(""))
                .startDate(startDate)
                .endDate(endDate)
                .startTime(startTime)
                .endTime(endTime)
                .location(Optional.ofNullable(event.getLocation()).orElse(""))
                .favorite(isFavorite)
                .daysLeft((int) Duration.between(LocalDateTime.now(), event.getStartTime()).toDays())
                .eventId(event.getId().toString())
                .tabs(List.of("about", "venue", "organizer"))
                .tabsContent(buildTabsContent(event))
                .purchasedTicket(buildPurchasedTicket(ticketType))
                .status(determineStatus(event))
                .purchaseDate(formatDate(event.getCreatedAt()))
                .pricing(buildPricing(ticketType))
                .build();
    }

    private String determineStatus(Event event) {
        if ("cancelled".equalsIgnoreCase(event.getStatus())) return "cancelled";
        return event.getStartTime().isAfter(LocalDateTime.now()) ? "upcoming" : "past";
    }

    private Map<String, ? extends Serializable> buildPurchasedTicket(EventTicket type) {
        Map<String, Serializable> purchasedTicket = new HashMap<>();
        purchasedTicket.put("name", Optional.ofNullable(type.getName()).orElse(""));
        purchasedTicket.put("price", type.getPrice());
        purchasedTicket.put("quantity", 1);
        return purchasedTicket;
    }

    private Map<String, ? extends Serializable> buildPricing(EventTicket type) {
        Map<String, Serializable> pricing = new HashMap<>();
        double subtotal = type.getPrice();
        pricing.put("subtotal", subtotal);
        pricing.put("serviceFee", 10.0);
        pricing.put("tax", 5.0);
        pricing.put("total", subtotal + 15.0);
        return pricing;
    }

    private Map<String, Serializable> buildTabsContent(Event event) {
        Map<String, Serializable> tabs = new HashMap<>();

        List<String> about = Arrays.asList(Optional.ofNullable(event.getAbout()).orElse("").split("\\n\\n|\\."));
        tabs.put("about", (Serializable) about);

        tabs.put("venue", (Serializable) Map.of(
                "name", Optional.ofNullable(event.getVenue()).map(Venue::getName).orElse("Not available"),
                "address", Optional.ofNullable(event.getVenue()).map(Venue::getAddress).orElse(""),
                "mapEmbedLink", Optional.ofNullable(event.getVenue()).map(Venue::getMapEmbedLink).orElse(""),
                "mapViewLink", Optional.ofNullable(event.getVenue()).map(Venue::getMapViewLink).orElse("")
        ));

        tabs.put("organizer", (Serializable) Map.of(
                "name", Optional.ofNullable(event.getOrganizer()).map(Organizer::getName).orElse(""),
                "bio", Optional.ofNullable(event.getOrganizer()).map(Organizer::getBio).orElse(""),
                "email", Optional.ofNullable(event.getOrganizer()).map(Organizer::getEmail).orElse("")
        ));

        return tabs;
    }

    private String formatDate(LocalDateTime dateTime) {
        return dateTime != null
                ? dateTime.toLocalDate().format(DateTimeFormatter.ofPattern("MMMM d, yyyy"))
                : "";
    }

    private String formatTime(LocalDateTime dateTime) {
        return dateTime != null
                ? dateTime.toLocalTime().format(DateTimeFormatter.ofPattern("h:mm a"))
                : "";
    }
}
