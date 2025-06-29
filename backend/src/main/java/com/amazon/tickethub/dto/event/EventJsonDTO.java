package com.amazon.tickethub.dto.event;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EventJsonDTO {
    private String title;
    private String description;
    private String location;
    private String price;
    private String startTime;
    private String endTime;
    private String language;
    private String about;
    private String venueName;
    private String venueAddress;
    private String organizerName;
    private String organizerDescription;
    private String mapEmbedLink;
    private String mapViewLink;
    private String badge;
    private String imageUrl;
    private String status;
    private boolean isUserEvent;
    private String category;
    private List<TicketDTO> tickets;
}
