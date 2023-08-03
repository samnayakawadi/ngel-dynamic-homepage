package com.ModelContent.modelContent.validation.common.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.ModelContent.modelContent.validation.common.handlers.ValidateStringLengthHandler;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ValidateStringLengthHandler.class)
public @interface ValidateStringLength {
    public String message() default "The Allowed String Length is 1 to 250 Characters";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String max() default "250";

    String min() default "1";
}
