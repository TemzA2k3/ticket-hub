package com.amazon.tickethub.dto.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullEventDetailsDTO {
    private long id;
    private String title;
    private String image;
    private String badge;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private String location;
    private boolean isFavorite;
    private List<String> tabs;
    private EventTabsDTO tabsContent;
    private List<TicketDTO> tickets;
}
