package com.ModelContent.modelContent.dto.data;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class FileTypeContentDTO {
    @Pattern(regexp = "^[a-z0-9]+$", message = "Invalid fileId")
    @Size(min = 24, max = 24, message = "fileId length must be 24 characters")
    private String link;

    public FileTypeContentDTO(String link) {
        this.link = link;
    }

    public FileTypeContentDTO() {
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

}
