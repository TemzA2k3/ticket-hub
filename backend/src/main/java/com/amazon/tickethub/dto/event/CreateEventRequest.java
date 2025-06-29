package com.amazon.tickethub.dto.event;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class CreateEventRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String category;

    @NotBlank
    private String description;

    @NotNull
    private LocalDate startDate;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    @Schema(type = "string", example = "00:00", format = "time")
    private LocalTime startTime;

    @NotNull
    private LocalDate endDate;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    @Schema(type = "string", example = "00:00", format = "time")
    private LocalTime endTime;

    @NotBlank
    private String venueName;

    @NotBlank
    private String venueAddress;

    @NotBlank
    private String mapEmbedLink;

    @NotBlank
    private String mapViewLink;

    private String additionalInfo;
}
