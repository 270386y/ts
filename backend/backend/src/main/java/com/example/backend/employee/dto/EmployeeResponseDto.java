package com.example.backend.employee.dto;

public class EmployeeResponseDto {
    private Long employeeId;
    private Long userId;
    private Integer priority;
    private Integer minTime;
    private Integer maxTime;
    private Boolean newcomer;
    private Long storeId;

    public EmployeeResponseDto(Long employeeId, Long userId, Integer priority, Integer minTime, Integer maxTime,
            Boolean newcomer, Long storeId) {
        this.employeeId = employeeId;
        this.userId = userId;
        this.priority = priority;
        this.minTime = minTime;
        this.maxTime = maxTime;
        this.newcomer = newcomer;
        this.storeId = storeId;
    }

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
}
