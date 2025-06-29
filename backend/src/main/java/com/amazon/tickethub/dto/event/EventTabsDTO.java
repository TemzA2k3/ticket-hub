package com.amazon.tickethub.dto.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventTabsDTO {
    private String about;
    private VenueDTO venue;
    private OrganizerDTO organizer;
}
