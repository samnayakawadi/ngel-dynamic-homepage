package com.ModelContent.modelContent.dto.data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TextTypeContentDTO {

    @NotNull(message = "Value cannot be null")
    @Size(min = 1, max = 500, message = "Value should have Min Value of 1 and Max value of 250 characters")
    @NotEmpty(message = "value can not be empty")
    @NotBlank(message = "Value can no be Blank")
    private String value;

    public TextTypeContentDTO(String value) {
        this.value = value;
    }

    public TextTypeContentDTO() {
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
