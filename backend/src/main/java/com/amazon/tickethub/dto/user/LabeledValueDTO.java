package com.amazon.tickethub.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LabeledValueDTO {
    private String label;
    private String value;
    private Boolean full; // для поля bio
}
