package com.ModelContent.modelContent.exceptionHandler;

import org.springframework.http.HttpStatus;

import com.ModelContent.modelContent.response.GlobalReponse;

public class GlobalCustomException extends RuntimeException {

    private HttpStatus httpStatus;
    private GlobalReponse globalResponse;

    public GlobalCustomException() {
    }

    public GlobalCustomException(GlobalReponse globalResponse, HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
        this.globalResponse = globalResponse;
    }

    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public GlobalReponse getGlobalResponse() {
        return this.globalResponse;
    }

    public void setGlobalResponse(GlobalReponse globalResponse) {
        this.globalResponse = globalResponse;
    } 
}
