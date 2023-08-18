package com.ModelContent.modelContent.dto.data.LinkTypeDto;

import javax.validation.constraints.NotNull;

public class LinkTypeLinkContentData {
     @NotNull(message = "Value cannot be empty")
    private String value;

    public LinkTypeLinkContentData(String value) {
        this.value = value;
    }

    public LinkTypeLinkContentData() {
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
