package com.amazon.tickethub.dto.event;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private String location;
    private String status;
    private String categoryName;
    private String language;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String imageUrl;
    private boolean isUserEvent;
}
