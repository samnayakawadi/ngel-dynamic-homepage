package com.ModelContent.modelContent.response;

import java.util.Map;

public class GlobalValidationResponse {
    private Integer status;
    private String message = "Resolve Errors";
    private Map<String, String> errors;

    public GlobalValidationResponse() {
    }

    public GlobalValidationResponse(Integer status, Map<String, String> errors) {
        this.status = status;
        this.errors = errors;
    }

    public Integer getStatus() {
        return this.status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getErrors() {
        return this.errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }

}