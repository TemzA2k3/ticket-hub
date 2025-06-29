package com.amazon.tickethub.repository;

import com.amazon.tickethub.entity.Event;
import com.amazon.tickethub.entity.Ticket;
import com.amazon.tickethub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByEventId(Long eventId);
    boolean existsByUserAndEvent(User user, Event event);
    List<Ticket> findByUser(User user);
    
    @Query("SELECT t FROM Ticket t " +
           "LEFT JOIN FETCH t.event e " +
           "LEFT JOIN FETCH e.venue " +
           "LEFT JOIN FETCH e.organizer " +
           "LEFT JOIN FETCH e.tickets " +
           "LEFT JOIN FETCH t.eventTicket " +
           "WHERE t.user = :user")
    List<Ticket> findByUserWithAllRelations(@Param("user") User user);
}
