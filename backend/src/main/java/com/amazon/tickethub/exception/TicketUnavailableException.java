package com.amazon.tickethub.exception;

public class TicketUnavailableException extends RuntimeException {
    public TicketUnavailableException(String message) {
        super(message);
    }
}
