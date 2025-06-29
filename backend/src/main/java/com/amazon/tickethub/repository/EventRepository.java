package com.amazon.tickethub.repository;

import com.amazon.tickethub.entity.Category;
import com.amazon.tickethub.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {

    List<Event> findTop5ByStartTimeAfterOrderByStartTimeAsc(LocalDateTime now);

    @Query("""
    SELECT e FROM Event e 
    WHERE LOWER(e.category.name) = LOWER(:category) 
    AND e.startTime > :now 
    ORDER BY e.startTime ASC
    """)
    List<Event> findNextUpcomingEventByCategory(String category, LocalDateTime now);

    @Query("SELECT e FROM Event e ORDER BY e.createdAt DESC LIMIT 3")
    List<Event> findTop3ByOrderByCreatedAtDesc();

    long countByCategory(Category category);

    @Query("SELECT e FROM Event e LEFT JOIN FETCH e.tickets WHERE e.id = :id")
    Optional<Event> findByIdWithTickets(@Param("id") Long id);
}