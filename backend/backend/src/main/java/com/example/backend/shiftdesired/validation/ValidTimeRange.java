package com.example.backend.shiftdesired.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ShiftDesiredTimeRangeValidator.class)
@Documented
public @interface ValidTimeRange {
    String message() default "timeStart must be before timeFinish";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
