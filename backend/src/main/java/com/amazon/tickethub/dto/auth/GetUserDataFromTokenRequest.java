package com.amazon.tickethub.dto.auth;

import lombok.Data;

@Data
public class GetUserDataFromTokenRequest {
    private String token;
} 