package com.amazon.tickethub.repository;

import com.amazon.tickethub.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    Optional<Venue> findByNameIgnoreCaseAndAddressIgnoreCase(String name, String address);
}