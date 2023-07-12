package com.ModelContent.modelContent.document.ContentModel.textTypeContent;

public class TextTypeContent {

    private String type;
    private String value;
    private String regex;
    private String errorMessage;
    private Integer minLength;
    private Integer maxLength;

    public TextTypeContent() {
    }

    public TextTypeContent(String type, String value, String regex, String errorMessage, Integer minLength,
            Integer maxLength) {
        this.type = type;
        this.value = value;
        this.regex = regex;
        this.errorMessage = errorMessage;
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
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

    public Integer getMinLength() {
        return this.minLength;
    }

    public void setMinLength(Integer minLength) {
        this.minLength = minLength;
    }

    public Integer getMaxLength() {
        return this.maxLength;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
    }

}
