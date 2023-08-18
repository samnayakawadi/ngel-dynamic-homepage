package com.ModelContent.modelContent.validation.common.handlers;

import com.ModelContent.modelContent.validation.common.annotations.ValidateStringLength;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidateStringLengthHandler implements ConstraintValidator<ValidateStringLength, String> {

    private Integer max = 0;
    private Integer min = 0;

    @Override
    public void initialize(ValidateStringLength constraint) {
        max = Integer.parseInt(constraint.max());
        min = Integer.parseInt(constraint.min());
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (s == null) {
            return false;
        } else if ((s.trim().length() >= min) && (s.trim().length() <= max)) {
            return true;
        }
        return false;
    }
}