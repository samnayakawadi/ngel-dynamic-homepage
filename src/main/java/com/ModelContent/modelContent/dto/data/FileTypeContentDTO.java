package com.ModelContent.modelContent.dto.data;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class FileTypeContentDTO {
    // this regexp match the like this id : 480e49d5-f318-4663-afe2-00f642a6ddbc
    @Pattern(regexp = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\\.(png|jpg|jpeg)$", message = "Invalid fileId")
    @Size(min = 3, max = 50, message = "fileId length must be 36 characters")
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
