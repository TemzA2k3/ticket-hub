package com.amazon.tickethub.dto.event;

import lombok.Data;

@Data
public class EventTicketDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private boolean available;
}
