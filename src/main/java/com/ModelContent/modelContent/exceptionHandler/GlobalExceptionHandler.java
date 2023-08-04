package com.ModelContent.modelContent.exceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> methodArgsNotValidExceptionHandler(
            MethodArgumentNotValidException e) {
        Map<String, String> resp = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            resp.put(fieldName, message);
        });

        return new ResponseEntity<>(new ValidationErrorResponse("406", "Resolve Errors", resp),
                HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler({ ConstraintViolationException.class })
    public ResponseEntity<ValidationErrorResponse> handleConstraintViolation(
            ConstraintViolationException ex, WebRequest request) {

        Map<String, String> resp = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            resp.put(violation.getPropertyPath().toString(), violation.getMessage());
        }

        return new ResponseEntity<>(new ValidationErrorResponse("406", "Resolve Errors", resp),
                HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(value = GlobalCustomException.class)
    public ResponseEntity<Object> globalCustomExceptionHandler(GlobalCustomException e) {
        return new ResponseEntity<>(e.getGlobalResponse(),
                e.getHttpStatus());
    }

    @ExceptionHandler(value = GlobalValidationException.class)
    public ResponseEntity<Object> globalValidationExceptionHandler(GlobalValidationException e) {
        return new ResponseEntity<>(e.getGlobalValidationResponse(),
                e.getHttpStatus());
    }
}
