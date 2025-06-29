package com.amazon.tickethub.util;

import com.amazon.tickethub.entity.Event;
import com.amazon.tickethub.entity.EventTicket;

import java.util.List;
import java.util.Optional;

public class PriceUtil {

    public static String getPriceSummary(Event event) {
        return Optional.ofNullable(event.getTickets())
                .orElse(List.of())
                .stream()
                .map(EventTicket::getPrice)
                .min(Double::compare)
                .map(p -> "From $" + String.format("%.2f", p))
                .orElse("N/A");
    }
}
