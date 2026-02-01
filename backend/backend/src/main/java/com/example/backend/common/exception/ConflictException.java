package com.example.backend.common.exception;

public class ConflictException extends RuntimeException {
    private final String field;

    // 既存：フィールド名 + メッセージ
    public ConflictException(String field, String message) {
        super(message);
        this.field = field;
    }

    // 追加：メッセージだけ（ShiftServiceの書き方に合わせる）
    public ConflictException(String message) {
        super(message);
        this.field = null;
    }

    public String getField() { return field; }
}
