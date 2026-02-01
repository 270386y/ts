package com.example.backend.user.dto;

public class UserResponseDto {
    private Long userId;
    private String mailaddress;
    private String name;
    private String phone;
    private String address;
    private String company;

    public UserResponseDto(Long userId, String mailaddress, String name, String phone, String address, String company) {
        this.userId = userId;
        this.mailaddress = mailaddress;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.company = company;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMailaddress() {
        return mailaddress;
    }

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
