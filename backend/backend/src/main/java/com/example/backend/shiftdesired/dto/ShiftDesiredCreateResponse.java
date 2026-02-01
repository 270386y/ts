package com.example.backend.shiftdesired.dto;

public class ShiftDesiredCreateResponse {
    public Long id;
    // idを受け取ってそれをセットする.
    public ShiftDesiredCreateResponse(Long id) {
        this.id = id;
    }
}
