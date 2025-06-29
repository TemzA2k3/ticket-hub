package com.amazon.tickethub.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private long id;
    private String email;
    private String firstName;
    private String lastName;
    private boolean verified;
    private String avatarUrl;

}
