package com.amazon.tickethub.service;

import com.amazon.tickethub.dto.event.*;
import com.amazon.tickethub.entity.Event;
import com.amazon.tickethub.repository.EventRepository;
import com.amazon.tickethub.repository.FavoriteRepository;
import com.amazon.tickethub.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

import static com.amazon.tickethub.util.PriceUtil.getPriceSummary;

@Service
@RequiredArgsConstructor
@Transactional
public class EventQueryService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream().map(this::toEventDTO).toList();
    }

    public Optional<FullEventDetailsDTO> getFullEventDetails(Long id, String userEmail) {
        return eventRepository.findById(id).map(event -> toFullDetailsDTO(event, userEmail));
    }


    public List<UpcomingEventDTO> getUpcomingEvents() {
        List<Event> events = eventRepository.findTop5ByStartTimeAfterOrderByStartTimeAsc(LocalDateTime.now());

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMMM d, yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");

        return events.stream().map(event -> {
            String price = getPriceSummary(event);
            return new UpcomingEventDTO(
                    event.getId(),
                    event.getTitle(),
                    event.getCategory().getName(),
                    event.getStartTime().format(dateFormatter),
                    event.getStartTime().format(timeFormatter),
                    event.getLocation(),
                    price
            );
        }).toList();
    }

    public List<FeaturedEventDTO> getFeaturedEvents() {
        List<Event> latestEvents = eventRepository.findTop3ByOrderByCreatedAtDesc();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy");

        return latestEvents.stream()
                .map(event -> new FeaturedEventDTO(
                        String.valueOf(event.getId()),
                        event.getImageUrl(),
                        event.getTitle(),
                        event.getStartTime().format(formatter),
                        event.getLocation(),
                        getPriceSummary(event),
                        event.getCategory().getName()
                ))
                .toList();
    }

    public Map<String, Object> getFilteredEvents(
            int page,
            String name,
            String category,
            String location,
            String date,
            String time
    ) {
        int pageSize = 8;
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("startTime"));

        Specification<Event> spec = Specification.where(null);

        if (name != null && !name.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("title")), "%" + name.toLowerCase() + "%"));
        }

        if (category != null && !"all_categories".equalsIgnoreCase(category)) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("category").get("name")), category.toLowerCase()));
        }

        if (location != null && !location.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
        }

        if (date != null && !date.isBlank()) {
            try {
                LocalDate parsedDate = LocalDate.parse(date);
                spec = spec.and((root, query, cb) ->
                        cb.between(root.get("startTime"),
                                parsedDate.atStartOfDay(),
                                parsedDate.plusDays(1).atStartOfDay()));
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid date format. Expected format: YYYY-MM-DD");
            }
        } else {
            LocalDateTime now = LocalDateTime.now();
            if (time != null) {
                switch (time.toLowerCase()) {
                    case "today" -> spec = spec.and((root, query, cb) ->
                            cb.between(root.get("startTime"),
                                    now.toLocalDate().atStartOfDay(),
                                    now.toLocalDate().plusDays(1).atStartOfDay()));
                    case "tomorrow" -> spec = spec.and((root, query, cb) ->
                            cb.between(root.get("startTime"),
                                    now.toLocalDate().plusDays(1).atStartOfDay(),
                                    now.toLocalDate().plusDays(2).atStartOfDay()));
                    case "this_weekend" -> {
                        LocalDate saturday = now.toLocalDate().with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));
                        LocalDate sunday = saturday.plusDays(1);
                        spec = spec.and((root, query, cb) ->
                                cb.between(root.get("startTime"),
                                        saturday.atStartOfDay(),
                                        sunday.plusDays(1).atStartOfDay()));
                    }
                    case "this_week" -> {
                        LocalDateTime startOfToday = now.toLocalDate().atStartOfDay();
                        LocalDateTime endOfWeek = now.toLocalDate().with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)).atTime(23, 59);
                        spec = spec.and((root, query, cb) ->
                                cb.between(root.get("startTime"), startOfToday, endOfWeek));
                    }
                    case "this_month" -> {
                        LocalDateTime nowTime = LocalDateTime.now();
                        LocalDateTime endOfMonth = now.toLocalDate().with(TemporalAdjusters.lastDayOfMonth()).atTime(23, 59);
                        spec = spec.and((root, query, cb) ->
                                cb.between(root.get("startTime"), nowTime, endOfMonth));
                    }

                    default -> spec = spec.and((root, query, cb) ->
                            cb.greaterThan(root.get("startTime"), now));

                }
            }
        }

        Page<Event> eventPage = eventRepository.findAll(spec, pageable);

        List<EventCardDTO> cards = eventPage.getContent().stream().map(event -> new EventCardDTO(
                event.getId(),
                event.getImageUrl(),
                event.getTitle(),
                event.getStartTime().format(DateTimeFormatter.ofPattern("MMMM d, yyyy")),
                event.getLocation(),
                getPriceSummary(event),
                event.getCategory().getName()
        )).toList();

        Map<String, Object> result = new HashMap<>();
        result.put("events", cards);
        result.put("totalCount", eventPage.getTotalElements());

        return result;
    }


    private EventDTO toEventDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setLocation(event.getLocation());
        dto.setStatus(event.getStatus());
        dto.setCategoryName(event.getCategory().getName());
        dto.setLanguage(event.getLanguage());
        dto.setStartTime(event.getStartTime());
        dto.setEndTime(event.getEndTime());
        dto.setImageUrl(event.getImageUrl());
        dto.setUserEvent(event.isUserEvent());
        return dto;
    }

    private FullEventDetailsDTO toFullDetailsDTO(Event event, String userEmail) {
        boolean isFavorite = false;

        if (userEmail != null) {
            var userOpt = userRepository.findByEmail(userEmail);
            if (userOpt.isPresent()) {
                isFavorite = favoriteRepository.existsByUserIdAndEventId(userOpt.get().getId(), event.getId());
            }
        }

        EventTabsDTO tabs = new EventTabsDTO(
                event.getDescription(),
                new VenueDTO(
                        event.getVenue() != null ? event.getVenue().getName() : null,
                        event.getVenue() != null ? event.getVenue().getAddress() : null,
                        event.getVenue() != null ? event.getVenue().getMapEmbedLink() : null,
                        event.getVenue() != null ? event.getVenue().getMapViewLink() : null
                ),
                new OrganizerDTO(
                        event.getOrganizer() != null ? event.getOrganizer().getName() : null,
                        event.getOrganizer() != null ? event.getOrganizer().getBio() : null,
                        event.getOrganizer() != null ? event.getOrganizer().getEmail() : null
                )
        );


        List<TicketDTO> tickets = Optional.ofNullable(event.getTickets()).orElse(List.of()).stream()
                .map(t -> {
                    LocalDateTime now = LocalDateTime.now();
                    boolean saleStarted = t.getSaleStart() == null || !now.isBefore(t.getSaleStart());
                    boolean saleNotEnded = t.getSaleEnd() == null || now.isBefore(t.getSaleEnd());
                    boolean available = saleStarted && saleNotEnded && t.getQuantity() > 0;
                    return new TicketDTO(
                            t.getName(),
                            t.getDescription(),
                            t.getPrice(),
                            available,
                            t.getQuantity()
                    );
                }).toList();

        DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("MMMM d, yyyy");
        DateTimeFormatter timeFmt = DateTimeFormatter.ofPattern("h:mm a");

        String startDate = event.getStartTime() != null ? event.getStartTime().toLocalDate().format(dateFmt) : null;
        String endDate = event.getEndTime() != null ? event.getEndTime().toLocalDate().format(dateFmt) : null;
        String startTime = event.getStartTime() != null ? event.getStartTime().toLocalTime().format(timeFmt) : null;
        String endTime = event.getEndTime() != null ? event.getEndTime().toLocalTime().format(timeFmt) : null;

        return new FullEventDetailsDTO(
                event.getId(),
                event.getTitle(),
                event.getImageUrl(),
                event.getBadge(),
                startDate,
                endDate,
                startTime,
                endTime,
                event.getLocation(),
                isFavorite,
                List.of("about", "venue", "organizer"),
                tabs,
                tickets
        );

    }
}
