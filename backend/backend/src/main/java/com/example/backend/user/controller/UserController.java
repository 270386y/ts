package com.example.backend.user.controller;

import com.example.backend.common.exception.ResourceNotFoundException;
import com.example.backend.user.dto.UserResponseDto;
import com.example.backend.user.dto.UserUpdateRequestDto;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ユーザー情報取得（パスワードは返さない）
    @GetMapping("/{id}")
    public UserResponseDto getUser(@PathVariable Long id) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));

        return new UserResponseDto(
                u.getUserId(),
                u.getMailaddress(),
                u.getName(),
                u.getPhone(),
                u.getAddress(),
                u.getCompany());
    }

    // ユーザー情報更新（プロフィール更新用）
    @PutMapping("/{id}")
    public UserResponseDto updateUser(@PathVariable Long id, @RequestBody UserUpdateRequestDto req) {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));

        if (req.getName() != null)
            u.setName(req.getName());
        if (req.getPhone() != null)
            u.setPhone(req.getPhone());
        if (req.getAddress() != null)
            u.setAddress(req.getAddress());
        if (req.getCompany() != null)
            u.setCompany(req.getCompany());

        User saved = userRepository.save(u);

        return new UserResponseDto(
                saved.getUserId(),
                saved.getMailaddress(),
                saved.getName(),
                saved.getPhone(),
                saved.getAddress(),
                saved.getCompany());
    }
}
