package com.amazon.tickethub.exception;

public class TicketSaleClosedException extends RuntimeException {
    public TicketSaleClosedException(String message) {
        super(message);
    }
}
