package com.amazon.tickethub.dto.event;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderRequestDTO {
    private String address;
    private String cardNumber;
    private String city;
    private String country;
    private String cvc;
    private String email;
    private String eventDate;
    
    @NotNull(message = "Event ID is required")
    private Long eventId;
    
    private String eventTitle;
    private String expiry;
    private String firstName;
    private String lastName;
    private String nameOnCard;
    private String paymentMethod;
    private String phone;
    
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
    
    private double serviceFee;
    private String state;
    private double subtotal;
    private double total;
    private String zip;

    @NotNull(message = "Ticket information is required")
    private TicketRequestDTO ticket;
}