package com.example.backend.shiftdesired.dto;

import com.example.backend.shiftdesired.entity.ShiftDesired;

import java.time.LocalDateTime;

public class ShiftDesiredDto {
    private Long storeDesiredId;
    private Long employeeId;
    private Long storeId;
    private LocalDateTime timeStart;
    private LocalDateTime timeFinish;
    private ShiftDesired.Situation situation;

    public ShiftDesiredDto(Long storeDesiredId, Long employeeId, Long storeId,
                           LocalDateTime timeStart, LocalDateTime timeFinish,
                           ShiftDesired.Situation situation) {
        this.storeDesiredId = storeDesiredId;
        this.employeeId = employeeId;
        this.storeId = storeId;
        this.timeStart = timeStart;
        this.timeFinish = timeFinish;
        this.situation = situation;
    }

    public Long getStoreDesiredId() { return storeDesiredId; }
    public Long getEmployeeId() { return employeeId; }
    public Long getStoreId() { return storeId; }
    public LocalDateTime getTimeStart() { return timeStart; }
    public LocalDateTime getTimeFinish() { return timeFinish; }
    public ShiftDesired.Situation getSituation() { return situation; }
}
