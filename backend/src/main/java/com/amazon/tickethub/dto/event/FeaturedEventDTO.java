package com.amazon.tickethub.dto.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeaturedEventDTO {
    private String id;
    private String image;
    private String title;
    private String date;
    private String location;
    private String price;
    private String category;
}