package com.ModelContent.modelContent.document.ContentModel.fileTypeContent;

public class FileTypeContent {
    private String type;
    private String link;
    private String regex;
    private String errorMessage;
    private Integer maxLength;

    public FileTypeContent() {
    }

    public FileTypeContent(String type, String link, String regex, String errorMessage, Integer maxLength) {
        this.type = type;
        this.link = link;
        this.regex = regex;
        this.errorMessage = errorMessage;
        this.maxLength = maxLength;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLink() {
        return this.link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getRegex() {
        return this.regex;
    }

    public void setRegex(String regex) {
        this.regex = regex;
    }

    public String getErrorMessage() {
        return this.errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Integer getMaxLength() {
        return this.maxLength;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
    }

}
