package com.ModelContent.modelContent.validation.common.handlers;

import com.ModelContent.modelContent.validation.common.annotations.ValidateEmptyString;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidateEmptyStringHandler implements ConstraintValidator<ValidateEmptyString, String> {
    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (s == null) {
            return false;
        } else if (s.trim().equals("")) {
            return false;
        }
        return true;
    }
}
