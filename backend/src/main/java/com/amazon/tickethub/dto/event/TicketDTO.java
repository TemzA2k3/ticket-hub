package com.amazon.tickethub.dto.event;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDTO {
    private String name;
    private String description;
    private double price;
    private boolean available;
    private int quantity;
}