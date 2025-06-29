package com.amazon.tickethub.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserProfileDataDTO {

    @Pattern(regexp = "^[A-Za-zÀ-ž\\s'-]{2,50}$", message = "First name must contain only letters and be 2–50 characters")
    private String firstName;

    @Pattern(regexp = "^[A-Za-zÀ-ž\\s'-]{2,50}$", message = "Last name must contain only letters and be 2–50 characters")
    private String lastName;

    @Email(message = "Email should be valid")
    private String email;

    @Pattern(regexp = "^$|^[0-9\\-\\+\\s()]{7,20}$", message = "Phone number must be 7–20 digits")
    private String phoneNumber;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @Pattern(regexp = "^$|^[\\p{L}\\s'-]{2,100}$", message = "Location must contain only letters and spaces")
    private String location;

    @Size(max = 500, message = "Bio must be up to 500 characters")
    private String bio;
}
