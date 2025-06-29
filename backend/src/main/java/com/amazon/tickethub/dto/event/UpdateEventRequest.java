package com.amazon.tickethub.dto.event;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class UpdateEventRequest {
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String location;
}
