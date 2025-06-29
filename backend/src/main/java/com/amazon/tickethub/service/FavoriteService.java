package com.amazon.tickethub.service;

import com.amazon.tickethub.dto.event.FavoriteEventDTO;
import com.amazon.tickethub.entity.Event;
import com.amazon.tickethub.entity.EventTicket;
import com.amazon.tickethub.entity.Favorite;
import com.amazon.tickethub.entity.User;
import com.amazon.tickethub.repository.EventRepository;
import com.amazon.tickethub.repository.FavoriteRepository;
import com.amazon.tickethub.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.amazon.tickethub.util.PriceUtil.getPriceSummary;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Transactional
    public void addToFavorites(Long userId, Long eventId) {
        if (favoriteRepository.existsByUserIdAndEventId(userId, eventId)) {
            return;
        }


        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));

        Favorite fav = new Favorite();
        fav.setUser(user);
        fav.setEvent(event);
        fav.setFavouritedAt(LocalDateTime.now());

        favoriteRepository.save(fav);
    }

    @Transactional
    public void removeFromFavourites(Long userId, Long eventId) {
        if (!favoriteRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new EntityNotFoundException("Favorite not found");
        }
        favoriteRepository.deleteByUserIdAndEventId(userId, eventId);
    }

    @Transactional
    public List<FavoriteEventDTO> getFavoriteEvents(Long userId) {
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);

        return favorites.stream().map(fav -> {
            Event e = fav.getEvent();
            int minPrice = e.getTickets().stream()
                .mapToInt(t -> (int) t.getPrice())
                .min()
                .orElse(0);
            return FavoriteEventDTO.builder()
                    .id(String.valueOf(e.getId()))
                    .image(e.getImageUrl())
                    .title(e.getTitle())
                    .date(formatDateRange(e.getStartTime(), e.getEndTime()))
                    .location(e.getLocation())
                    .price(getPriceSummary(e))
                    .category(e.getCategory().getName())
                    .daysLeft((int) ChronoUnit.DAYS.between(LocalDate.now(), e.getStartTime().toLocalDate()))
                    .priceValue(minPrice)
                    .status(e.getStartTime().isBefore(LocalDateTime.now()) ? "past" : "upcoming")
                    .build();
        }).toList();
    }

    private String formatDateRange(LocalDateTime start, LocalDateTime end) {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MMMM d, yyyy");
        if (start.toLocalDate().equals(end.toLocalDate())) {
            return fmt.format(start);
        } else {
            return fmt.format(start) + " - " + fmt.format(end);
        }
    }

    private int extractNumericValue(String priceStr) {
        try {
            return Integer.parseInt(priceStr.replaceAll("[^\\d]", ""));
        } catch (Exception e) {
            return 0;
        }
    }
}

