package com.example.backend.shift.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "SHIFT")
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shift_id")
    private Long shiftId;

    @Column(name = "store_id", nullable = false)
    private Long storeId;

    @Column(name = "shiftrule_id", nullable = false)
    private Long shiftruleId;

    @Column(name = "time_start", nullable = false)
    private LocalDateTime timeStart;

    @Column(name = "time_finish", nullable = false)
    private LocalDateTime timeFinish;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    public Shift() {
    }

    public Long getShiftId() {
        return shiftId;
    }

    public Long getStoreId() {
        return storeId;
    }

    public Long getShiftruleId() {
        return shiftruleId;
    }

    public LocalDateTime getTimeStart() {
        return timeStart;
    }

    public LocalDateTime getTimeFinish() {
        return timeFinish;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public void setShiftruleId(Long shiftruleId) {
        this.shiftruleId = shiftruleId;
    }

    public void setTimeStart(LocalDateTime timeStart) {
        this.timeStart = timeStart;
    }

    public void setTimeFinish(LocalDateTime timeFinish) {
        this.timeFinish = timeFinish;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }
}
