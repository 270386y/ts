package com.example.backend.employee.dto;

public class EmployeeCardDto {
    private Long employeeId;
    private String name;
    private String phone;
    private String address;

    public EmployeeCardDto(Long employeeId, String name, String phone, String address) {
        this.employeeId = employeeId;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }
    public Long getEmployeeId() { return employeeId; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }
}
