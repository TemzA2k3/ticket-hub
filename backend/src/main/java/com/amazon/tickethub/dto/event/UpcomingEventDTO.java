package com.amazon.tickethub.dto.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpcomingEventDTO {
    private Long id;
    private String title;
    private String category;
    private String date;
    private String time;
    private String location;
    private String price;
}
