package com.amazon.tickethub.repository;

import com.amazon.tickethub.entity.EventTicket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventTicketRepository extends JpaRepository<EventTicket, Long> {
    List<EventTicket> findByEventId(Long eventId);
}
