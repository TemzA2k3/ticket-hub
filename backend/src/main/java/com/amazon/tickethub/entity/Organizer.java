package com.amazon.tickethub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "organizers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Organizer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String bio;
    private String email;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
}