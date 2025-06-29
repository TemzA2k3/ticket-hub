package com.amazon.tickethub.repository;

import com.amazon.tickethub.entity.Organizer;
import com.amazon.tickethub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizerRepository extends JpaRepository<Organizer, Long> {
    Optional<Organizer> findByNameAndBio(String name, String bio);
    Optional<Organizer> findByUser(User user);
}