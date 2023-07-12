package com.ModelContent.modelContent.document.ContentModel.linkTypeContent.data;

public class LinkTypeLinkcontentData{
    private String value;
    private String regex;
    private String errorMessage;
    private String minLength;
    private String maxLength;

    

    public LinkTypeLinkcontentData() {
    }

    public LinkTypeLinkcontentData(String value, String regex, String errorMessage, String minLength,
            String maxLength) {
        this.value = value;
        this.regex = regex;
        this.errorMessage = errorMessage;
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getRegex() {
        return regex;
    }

    public void setRegex(String regex) {
        this.regex = regex;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getMinLength() {
        return minLength;
    }

    public void setMinLength(String minLength) {
        this.minLength = minLength;
    }

    public String getMaxLength() {
        return maxLength;
    }

    public void setMaxLength(String maxLength) {
        this.maxLength = maxLength;
    }

}
