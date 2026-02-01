package com.example.backend.shift.dto;

import java.time.LocalDateTime;

public class ShiftDto {
    private Long shiftId;
    private Long storeId;
    private Long shiftruleId;
    private LocalDateTime timeStart;
    private LocalDateTime timeFinish;
    private Long createdBy;

    public ShiftDto() {}

    public ShiftDto(Long shiftId, Long storeId, Long shiftruleId,
                    LocalDateTime timeStart, LocalDateTime timeFinish, Long createdBy) {
        this.shiftId = shiftId;
        this.storeId = storeId;
        this.shiftruleId = shiftruleId;
        this.timeStart = timeStart;
        this.timeFinish = timeFinish;
        this.createdBy = createdBy;
    }

    public Long getShiftId() { return shiftId; }
    public Long getStoreId() { return storeId; }
    public Long getShiftruleId() { return shiftruleId; }
    public LocalDateTime getTimeStart() { return timeStart; }
    public LocalDateTime getTimeFinish() { return timeFinish; }
    public Long getCreatedBy() { return createdBy; }

    public void setShiftId(Long shiftId) { this.shiftId = shiftId; }
    public void setStoreId(Long storeId) { this.storeId = storeId; }
    public void setShiftruleId(Long shiftruleId) { this.shiftruleId = shiftruleId; }
    public void setTimeStart(LocalDateTime timeStart) { this.timeStart = timeStart; }
    public void setTimeFinish(LocalDateTime timeFinish) { this.timeFinish = timeFinish; }
    public void setCreatedBy(Long createdBy) { this.createdBy = createdBy; }
}
