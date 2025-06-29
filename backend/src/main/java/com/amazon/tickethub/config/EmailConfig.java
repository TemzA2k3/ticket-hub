package com.amazon.tickethub.config;

import com.sendgrid.SendGrid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmailConfig {

    @Value("${sendgrid.api.key}")
    private String sendgridApiKey;

    @Bean
    public SendGrid sendGrid() {
        return new SendGrid(sendgridApiKey);
    }
}
