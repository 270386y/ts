package com.example.backend.user.dto;

public class UserUpdateRequestDto {
    private String name;
    private String phone;
    private String address;
    private String company;

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getCompany() {
        return company;
    }
}
