package com.amazon.tickethub.dto.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrganizerDTO {
    private String name;
    private String bio;
    private String email;
}