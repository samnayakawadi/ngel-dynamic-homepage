package com.ModelContent.modelContent.validation.common.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.ModelContent.modelContent.validation.common.handlers.ValidateEmptyStringHandler;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ValidateEmptyStringHandler.class)
public @interface ValidateEmptyString {
    public String message() default "Cannot be empty";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}