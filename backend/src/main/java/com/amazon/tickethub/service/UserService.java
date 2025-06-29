package com.amazon.tickethub.service;

import com.amazon.tickethub.dto.user.LabeledValueDTO;
import com.amazon.tickethub.dto.user.StatDTO;
import com.amazon.tickethub.dto.user.UserProfileDTO;
import com.amazon.tickethub.dto.user.UserProfileDataDTO;
import com.amazon.tickethub.entity.Role;
import com.amazon.tickethub.entity.Ticket;
import com.amazon.tickethub.entity.User;
import com.amazon.tickethub.entity.Organizer;
import com.amazon.tickethub.repository.FavoriteRepository;
import com.amazon.tickethub.repository.OrganizerRepository;
import com.amazon.tickethub.repository.TicketRepository;
import com.amazon.tickethub.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final FavoriteRepository favoriteRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final OrganizerRepository organizerRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"))
                .getId();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public UserProfileDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();

        List<Ticket> userTickets = ticketRepository.findAll().stream()
                .filter(t -> t.getUser().getId().equals(userId))
                .toList();

        LocalDateTime now = LocalDateTime.now();

        long eventsAttended = userTickets.stream()
                .filter(t -> t.getEvent().getStartTime().isBefore(now))
                .map(t -> t.getEvent().getId())
                .distinct()
                .count();

        long upcomingEvents = userTickets.stream()
                .filter(t -> t.getEvent().getStartTime().isAfter(now))
                .map(t -> t.getEvent().getId())
                .distinct()
                .count();

        double totalSpentAmount = userTickets.stream()
                .filter(Ticket::isConfirmed)
                .mapToDouble(t -> t.getEventTicket().getPrice() + 10.0 + 5.0)
                .sum();

        String totalSpentFormatted = "$" + String.format("%,.0f", totalSpentAmount);

        long favorites = favoriteRepository.countByUserId(userId);

        String avatarUrl = user.getAvatarUrl();

        DateTimeFormatter dobFormatter = DateTimeFormatter.ofPattern("MMMM d, yyyy");
        DateTimeFormatter memberSinceFormatter = DateTimeFormatter.ofPattern("MMMM yyyy");
        String title = user.getTitle() != null ? user.getTitle() : "Event Enthusiast";

        return UserProfileDTO.builder()
                .id(user.getId())
                .avatarUrl(avatarUrl)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .title(title)
                .email(user.getEmail())
                .location(user.getLocation())
                .membership(getMembershipLabel(user.getRole()))
                .memberSince(
                        user.getCreatedAt() != null
                                ? user.getCreatedAt().format(memberSinceFormatter)
                                : ""
                )
                .personalInfo(List.of(
                        new LabeledValueDTO("First Name", user.getFirstName(), null),
                        new LabeledValueDTO("Last Name", user.getLastName(), null),
                        new LabeledValueDTO("Email Address", user.getEmail(), null),
                        new LabeledValueDTO("Phone Number", user.getPhoneNumber(), null),
                        new LabeledValueDTO("Date of Birth",
                                user.getDateOfBirth() != null
                                        ? user.getDateOfBirth().format(dobFormatter)
                                        : "",
                                null),
                        new LabeledValueDTO("Location", user.getLocation(), null),
                        new LabeledValueDTO("Bio", user.getBio(), true)
                ))
                .stats(List.of(
                        new StatDTO("ticket", String.valueOf(eventsAttended), "Events Attended"),
                        new StatDTO("heart", String.valueOf(favorites), "Favorite Events"),
                        new StatDTO("calendar-plus", String.valueOf(upcomingEvents), "Upcoming Events"),
                        new StatDTO("dollar-sign", totalSpentFormatted, "Total Spent")
                ))
                .build();
    }

    @Transactional
    public void updateUserProfile(Long userId, UserProfileDataDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        boolean nameChanged = false;
        boolean bioChanged = false;

        if (dto.getFirstName() != null && !dto.getFirstName().isEmpty()) {
            user.setFirstName(dto.getFirstName());
            nameChanged = true;
        }
        if (dto.getLastName() != null && !dto.getLastName().isEmpty()) {
            user.setLastName(dto.getLastName());
            nameChanged = true;
        }
        user.setPhoneNumber(dto.getPhoneNumber() != null ? dto.getPhoneNumber() : "");
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setLocation(dto.getLocation() != null ? dto.getLocation() : "");
        if (dto.getBio() != null) {
            user.setBio(dto.getBio());
            bioChanged = true;
        }

        userRepository.save(user);

        if (nameChanged || bioChanged) {
            Optional<Organizer> organizerOpt = organizerRepository.findByUser(user);
            if (organizerOpt.isPresent()) {
                Organizer organizer = organizerOpt.get();
                if (nameChanged) {
                    organizer.setName(user.getFirstName() + " " + user.getLastName());
                }
                if (bioChanged) {
                    organizer.setBio(user.getBio());
                }
                organizerRepository.save(organizer);
            }
        }
    }

    public Map<String, String> validateProfileData(UserProfileDataDTO dto) {
        Map<String, String> errors = new HashMap<>();
        
        if (dto.getFirstName() == null || dto.getFirstName().trim().isEmpty()) {
            errors.put("firstName", "First name is required");
        } else if (!dto.getFirstName().matches("^[A-Za-zÀ-ž\\s'-]{2,50}$")) {
            errors.put("firstName", "First name must contain only letters and be 2–50 characters");
        }
        
        if (dto.getLastName() == null || dto.getLastName().trim().isEmpty()) {
            errors.put("lastName", "Last name is required");
        } else if (!dto.getLastName().matches("^[A-Za-zÀ-ž\\s'-]{2,50}$")) {
            errors.put("lastName", "Last name must contain only letters and be 2–50 characters");
        }
        
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            errors.put("email", "Email is required");
        } else if (!dto.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            errors.put("email", "Email should be valid");
        }
        
        if (dto.getPhoneNumber() != null && !dto.getPhoneNumber().trim().isEmpty() &&
            !dto.getPhoneNumber().matches("^[0-9\\-\\+\\s()]{7,20}$")) {
            errors.put("phoneNumber", "Phone number must be 7–20 digits and can include +, -, spaces or ()");
        }
        
        if (dto.getDateOfBirth() != null && dto.getDateOfBirth().isAfter(LocalDate.now())) {
            errors.put("dateOfBirth", "Date of birth must be in the past");
        }
        
        if (dto.getLocation() != null && !dto.getLocation().trim().isEmpty() &&
            !dto.getLocation().matches("^[\\p{L}\\s'-]{2,100}$")) {
            errors.put("location", "Location must contain only letters and spaces");
        }
        
        if (dto.getBio() != null && dto.getBio().length() > 500) {
            errors.put("bio", "Bio must be up to 500 characters");
        }
        
        return errors;
    }

    public List<LabeledValueDTO> mapToPersonalInfoResponse(UserProfileDataDTO dto) {
        List<LabeledValueDTO> personalInfo = new ArrayList<>();
        personalInfo.add(new LabeledValueDTO("First Name", dto.getFirstName(), null));
        personalInfo.add(new LabeledValueDTO("Last Name", dto.getLastName(), null));
        personalInfo.add(new LabeledValueDTO("Email Address", dto.getEmail(), null));
        personalInfo.add(new LabeledValueDTO("Phone Number", dto.getPhoneNumber(), null));
        
        DateTimeFormatter dobFormatter = DateTimeFormatter.ofPattern("MMMM d, yyyy");
        String dateOfBirth = dto.getDateOfBirth() != null ? dto.getDateOfBirth().format(dobFormatter) : "";
        personalInfo.add(new LabeledValueDTO("Date of Birth", dateOfBirth, null));
        
        personalInfo.add(new LabeledValueDTO("Location", dto.getLocation(), null));
        personalInfo.add(new LabeledValueDTO("Bio", dto.getBio(), true));

        return personalInfo;
    }

    private String getMembershipLabel(Role role) {
        return switch (role) {
            case VERIFIED -> "Premium member";
            case USER -> "Regular user";
            case ADMIN -> "Admin";
        };
    }
}
