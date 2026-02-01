package com.example.backend.shiftdesired.entity;

import com.example.backend.employee.entity.Employee;
import com.example.backend.store.entity.Store;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "SHIFT_DESIRED")
public class ShiftDesired {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_desired")
    private Long storeDesiredId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(name = "time_start", nullable = false)
    private LocalDateTime timeStart;

    @Column(name = "time_finish", nullable = false)
    private LocalDateTime timeFinish;

    @Enumerated(EnumType.STRING)
    @Column(name = "situation", nullable = false)
    private Situation situation = Situation.hold;

    public enum Situation {
        hold, approval, rejection, cancel
    }

    public Long getStoreDesiredId() {
        return storeDesiredId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Store getStore() {
        return store;
    }

    public LocalDateTime getTimeStart() {
        return timeStart;
    }

    public LocalDateTime getTimeFinish() {
        return timeFinish;
    }

    public Situation getSituation() {
        return situation;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public void setTimeStart(LocalDateTime timeStart) {
        this.timeStart = timeStart;
    }

    public void setTimeFinish(LocalDateTime timeFinish) {
        this.timeFinish = timeFinish;
    }

    public void setSituation(Situation situation) {
        this.situation = situation;
    }

    @Column(name = "shift_id")
    private Long shiftId;

    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }
}
