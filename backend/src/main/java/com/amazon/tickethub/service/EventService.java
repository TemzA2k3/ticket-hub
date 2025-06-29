package com.amazon.tickethub.service;

import com.amazon.tickethub.dto.event.CreateEventRequest;
import com.amazon.tickethub.dto.event.TicketRequest;
import com.amazon.tickethub.entity.*;
import com.amazon.tickethub.repository.CategoryRepository;
import com.amazon.tickethub.repository.EventRepository;
import com.amazon.tickethub.repository.OrganizerRepository;
import com.amazon.tickethub.repository.UserRepository;
import com.amazon.tickethub.repository.VenueRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final CategoryRepository categoryRepository;
    private final VenueRepository venueRepository;
    private final OrganizerRepository organizerRepository;
    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;
    private final Validator validator;

    public Event createEventWithValidation(
            String userEmail,
            CreateEventRequest eventData,
            MultipartFile image,
            List<TicketRequest> ticketTypes
    ) throws IOException {
        // Validate request data
        Set<ConstraintViolation<CreateEventRequest>> violations = validator.validate(eventData);
        if (!violations.isEmpty()) {
            String errorMessage = violations.stream()
                    .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                    .collect(Collectors.joining("; "));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage);
        }

        // Validate date/time logic
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = eventData.getStartDate().atTime(eventData.getStartTime());

        if (start.isBefore(now)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date/time must be in the future");
        }

        if (eventData.getEndDate() != null && eventData.getEndTime() != null) {
            LocalDateTime end = eventData.getEndDate().atTime(eventData.getEndTime());
            if (end.isBefore(start)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End date/time must be after start date/time");
            }
        }

        // Upload image
        String imageUrl = fileUploadService.upload(image);

        // Get user
        User creator = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Create event
        return createEvent(
                creator,
                eventData.getTitle(),
                eventData.getCategory(),
                eventData.getDescription(),
                start,
                (eventData.getEndDate() != null && eventData.getEndTime() != null)
                        ? eventData.getEndDate().atTime(eventData.getEndTime())
                        : null,
                eventData.getVenueName(),
                eventData.getVenueAddress(),
                eventData.getMapEmbedLink(),
                eventData.getMapViewLink(),
                eventData.getAdditionalInfo(),
                imageUrl,
                ticketTypes
        );
    }

    public Event createEvent(
            User creator,
            String title,
            String categoryName,
            String description,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String venueName,
            String venueAddress,
            String mapEmbedLink,
            String mapViewLink,
            String additionalInfo,
            String imageUrl,
            List<TicketRequest> ticketTypes
    ) {
        Category category = categoryRepository.findByNameIgnoreCase(categoryName)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category not found"));

        Organizer organizer = organizerRepository.findByUser(creator)
                .orElseGet(() -> {
                    String bio = creator.getBio();
                    Organizer newOrg = Organizer.builder()
                            .name(creator.getFirstName() + " " + creator.getLastName())
                            .bio(bio)
                            .email(creator.getEmail())
                            .user(creator)
                            .build();
                    return organizerRepository.save(newOrg);
                });

        String currentName = creator.getFirstName() + " " + creator.getLastName();
        String currentBio = creator.getBio();
        
        if (!currentName.equals(organizer.getName()) || 
            (currentBio != null && !currentBio.equals(organizer.getBio())) ||
            (currentBio == null && organizer.getBio() != null)) {
            
            organizer.setName(currentName);
            organizer.setBio(currentBio);
            organizerRepository.save(organizer);
        }

        Venue venue = venueRepository.findByNameIgnoreCaseAndAddressIgnoreCase(venueName, venueAddress)
                .orElseGet(() -> venueRepository.save(Venue.builder()
                        .name(venueName)
                        .address(venueAddress)
                        .mapEmbedLink(mapEmbedLink)
                        .mapViewLink(mapViewLink)
                        .build()));

        Event event = Event.builder()
                .title(title)
                .description(description)
                .startTime(startTime)
                .endTime(endTime)
                .venue(venue)
                .category(category)
                .additionalInfo(additionalInfo)
                .imageUrl(imageUrl)
                .isUserEvent(true)
                .status("active")
                .badge(categoryName)
                .location(venue.getAddress())
                .organizer(organizer)
                .build();

        if (ticketTypes != null && !ticketTypes.isEmpty()) {
            List<EventTicket> ticketEntities = ticketTypes.stream()
                    .map(dto -> {
                        LocalDateTime ticketSaleStart = dto.getSaleStart();
                        LocalDateTime ticketSaleEnd = getLocalDateTime(startTime, dto, ticketSaleStart);
                        return EventTicket.builder()
                                .event(event)
                                .name(dto.getName())
                                .description(dto.getDescription())
                                .price(dto.getPrice())
                                .quantity(dto.getQuantity())
                                .saleStart(ticketSaleStart)
                                .saleEnd(ticketSaleEnd)
                                .build();
                    })
                    .toList();

            event.setTickets(ticketEntities);

            ticketTypes.stream()
                    .mapToDouble(TicketRequest::getPrice)
                    .min()
                    .ifPresent(min -> event.setPrice(String.valueOf(min)));
        }

        return eventRepository.save(event);
    }

    private static LocalDateTime getLocalDateTime(LocalDateTime startTime, TicketRequest dto, LocalDateTime ticketSaleStart) {
        LocalDateTime ticketSaleEnd = dto.getSaleEnd();
        if (ticketSaleEnd == null) ticketSaleEnd = startTime;
        if (ticketSaleStart != null && ticketSaleStart.isAfter(ticketSaleEnd)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ticket sale start cannot be after sale end");
        }
        if ((ticketSaleStart != null && ticketSaleStart.isAfter(startTime)) ||
            (ticketSaleEnd != null && ticketSaleEnd.isAfter(startTime))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ticket sale start/end cannot be after event start");
        }
        return ticketSaleEnd;
    }

    @Transactional
    public Event getEventWithTickets(Long id) {
        return eventRepository.findByIdWithTickets(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));
    }
}
