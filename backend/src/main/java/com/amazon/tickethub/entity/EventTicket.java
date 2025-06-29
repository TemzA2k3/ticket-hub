package com.amazon.tickethub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "event_tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id", nullable = false)
    @JsonIgnore
    private Event event;

    private String name;
    private String description;
    private double price;
    private boolean available;
    private int quantity;
    private LocalDateTime saleStart;
    private LocalDateTime saleEnd;
    
    @Version
    private Long version;
}
