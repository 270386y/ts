package com.example.backend.shiftdesired.dto;

import com.example.backend.shiftdesired.validation.ValidTimeRange;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@ValidTimeRange(message = "timeStart は timeFinish より前である必要があります")
public class ShiftDesiredCreateRequest {
    @NotNull(message = "employeeId は必須です")
    private Long employeeId;

    @NotNull(message = "storeId は必須です")
    private Long storeId;

    @NotNull(message = "timeStart は必須です")
    private LocalDateTime timeStart;

    @NotNull(message = "timeFinish は必須です")
    private LocalDateTime timeFinish;
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Long getStoreId() { return storeId; }
    public void setStoreId(Long storeId) { this.storeId = storeId; }

    public LocalDateTime getTimeStart() { return timeStart; }
    public void setTimeStart(LocalDateTime timeStart) { this.timeStart = timeStart; }

    public LocalDateTime getTimeFinish() { return timeFinish; }
    public void setTimeFinish(LocalDateTime timeFinish) { this.timeFinish = timeFinish; }
}
