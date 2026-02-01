package com.example.backend.common;

import com.example.backend.common.exception.ConflictException;
import com.example.backend.common.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    // DTOの @NotNull やカスタムバリデーション(@ValidTimeRange) が落ちたとき
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new LinkedHashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            errors.putIfAbsent(fe.getField(), fe.getDefaultMessage());
        }

        ex.getBindingResult().getGlobalErrors()
                .forEach(ge -> errors.putIfAbsent("global", ge.getDefaultMessage()));

        return Map.of(
                "message", "validation error",
                "errors", errors
        );
    }

    // JSON自体が壊れてる / LocalDateTimeのパースに失敗したとき
    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleNotReadable(
            org.springframework.http.converter.HttpMessageNotReadableException ex) {
        return Map.of(
                "message", "invalid request body",
                "detail", ex.getMostSpecificCause() != null
                        ? ex.getMostSpecificCause().getMessage()
                        : ex.getMessage()
        );
    }

    // ResourceNotFoundException（resource/key/value形式 + message-only形式 両対応）
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> handleNotFound(ResourceNotFoundException ex) {

        // message-only のケース（resource/key/value が無い）
        if (ex.getResource() == null) {
            return Map.of(
                    "message", "not found",
                    "errors", Map.of("message", ex.getMessage())
            );
        }

        // 既存形式（resource/key/value）
        return Map.of(
                "message", "not found",
                "errors", Map.of(ex.getResource(), ex.getKey() + "=" + ex.getValue())
        );
    }

    // 重複などの競合
    @ExceptionHandler(ConflictException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, Object> handleConflict(ConflictException ex) {
        return Map.of(
                "message", "conflict",
                "errors", Map.of(ex.getField(), ex.getMessage())
        );
    }
}
