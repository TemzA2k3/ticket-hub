package com.amazon.tickethub.dto.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VenueDTO {
    private String name;
    private String address;
    private String mapEmbedLink;
    private String mapViewLink;
}
