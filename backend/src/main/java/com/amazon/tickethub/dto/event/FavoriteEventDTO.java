package com.amazon.tickethub.dto.event;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FavoriteEventDTO {
    private String id;
    private String image;
    private String title;
    private String date;
    private String location;
    private String price;
    private String category;
    private int daysLeft;
    private int priceValue;
    private String status;
}

