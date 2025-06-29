package com.amazon.tickethub.dto.user;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserProfileDTO {
    private Long id;
    private String avatarUrl;
    private String firstName;
    private String lastName;
    private String title;
    private String email;
    private String memberSince;
    private String location;
    private String membership;
    private List<LabeledValueDTO> personalInfo;
    private List<StatDTO> stats;
}



