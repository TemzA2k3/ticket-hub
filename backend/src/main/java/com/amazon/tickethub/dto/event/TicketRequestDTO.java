package com.amazon.tickethub.dto.event;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class TicketRequestDTO {
    @NotBlank(message = "Ticket name is required")
    private String name;
    
    private String description;
    
    @Min(value = 0, message = "Price cannot be negative")
    private double price;
    
    private boolean available;
}
