package com.example.backend.shiftrequest.dto;

public class ShiftRequestCreateResponse {
    private final boolean ok;
    private final String message;

    public ShiftRequestCreateResponse(boolean ok, String message) {
        this.ok = ok;
        this.message = message;
    }

    public boolean isOk() { return ok; }
    public String getMessage() { return message; }
}