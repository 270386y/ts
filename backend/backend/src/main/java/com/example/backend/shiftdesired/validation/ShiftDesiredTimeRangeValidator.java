package com.example.backend.shiftdesired.validation;

import com.example.backend.shiftdesired.dto.ShiftDesiredCreateRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ShiftDesiredTimeRangeValidator
        implements ConstraintValidator<ValidTimeRange, ShiftDesiredCreateRequest> {

    @Override
    public boolean isValid(ShiftDesiredCreateRequest value, ConstraintValidatorContext context) {
        if (value == null) return true;
        if (value.getTimeStart() == null || value.getTimeFinish() == null) return true;

        return value.getTimeStart().isBefore(value.getTimeFinish());
    }
}
