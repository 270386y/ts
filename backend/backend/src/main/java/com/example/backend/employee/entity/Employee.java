package com.example.backend.employee.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "EMPLOYEE")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "priority", nullable = false)
    private Integer priority;

    @Column(name = "min_time", nullable = false)
    private Integer minTime;

    @Column(name = "max_time", nullable = false)
    private Integer maxTime;

    @Column(name = "newcomer", nullable = false)
    private Boolean newcomer;

    @Column(name = "store_id", nullable = true)
    private Long storeId;

    public Long getEmployeeId() {
        return employeeId;
    }

    public Long getUserId() {
        return userId;
    }

    public Integer getPriority() {
        return priority;
    }

    public Integer getMinTime() {
        return minTime;
    }

    public Integer getMaxTime() {
        return maxTime;
    }

    public Boolean getNewcomer() {
        return newcomer;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public void setMinTime(Integer minTime) {
        this.minTime = minTime;
    }

    public void setMaxTime(Integer maxTime) {
        this.maxTime = maxTime;
    }

    public void setNewcomer(Boolean newcomer) {
        this.newcomer = newcomer;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }
}
