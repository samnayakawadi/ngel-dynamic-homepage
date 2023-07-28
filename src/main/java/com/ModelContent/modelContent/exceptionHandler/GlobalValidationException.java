package com.ModelContent.modelContent.exceptionHandler;

import org.springframework.http.HttpStatus;

import com.ModelContent.modelContent.response.GlobalValidationResponse;

public class GlobalValidationException extends RuntimeException {
    private HttpStatus httpStatus;
    private GlobalValidationResponse globalValidationResponse;

    public GlobalValidationException() {
    }

    public GlobalValidationException(GlobalValidationResponse globalValidationResponse, HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
        this.globalValidationResponse = globalValidationResponse;
    }

    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public GlobalValidationResponse getGlobalValidationResponse() {
        return this.globalValidationResponse;
    }

    public void setGlobalValidationResponse(GlobalValidationResponse globalValidationResponse) {
        this.globalValidationResponse = globalValidationResponse;
    }

}
