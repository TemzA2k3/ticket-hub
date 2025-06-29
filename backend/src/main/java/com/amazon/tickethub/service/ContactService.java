package com.amazon.tickethub.service;

import com.amazon.tickethub.dto.contact.ContactFormDataDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private static final Logger logger = LoggerFactory.getLogger(ContactService.class);
    private final EmailService emailService;

    public ContactService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void processContactForm(ContactFormDataDTO dto) {
        String to = "tickethub.project@gmail.com";
        String subject = "New Contact Form Submission: " + dto.getSubject();
        String content = "Name: " + dto.getName() + "\n"
                + "Email: " + dto.getEmail() + "\n"
                + "Category: " + dto.getCategory() + "\n"
                + "Message:\n" + dto.getMessage();

        logger.info("[ContactService] Sending contact form email to {} with subject: {}", to, subject);
        logger.debug("[ContactService] Email content: {}", content);
        emailService.sendEmail(to, subject, content);
        logger.info("[ContactService] Email sent to {}", to);
    }
} 