package com.ModelContent.modelContent.dto.data.LinkTypeDto;

import javax.validation.constraints.NotNull;

public class LinkTypeTitleContentData {
    @NotNull(message = "Value cannot be empty")

    private String value;

    public LinkTypeTitleContentData(String value) {
        this.value = value;
    }

    public LinkTypeTitleContentData() {
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
