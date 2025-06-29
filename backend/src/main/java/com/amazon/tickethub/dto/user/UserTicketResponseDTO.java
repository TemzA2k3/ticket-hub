package com.amazon.tickethub.dto.user;

import lombok.Builder;
import lombok.Data;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class UserTicketResponseDTO {
    private String id;
    private String title;
    private String image;
    private String badge;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private String location;
    private boolean favorite;
    private int daysLeft;
    private String eventId;
    private List<String> tabs;
    private Map<String, ? extends Serializable> tabsContent;
    private Map<String, ? extends Serializable> purchasedTicket;

    private String status;
    private String purchaseDate;
    private Map<String, ? extends Serializable> pricing;
    private Map<String, ? extends Serializable> refundInfo;

    private String seat;
    private Integer rating;
    private String ratingText;
}
