package com.example.backend.employee.controller;

import com.example.backend.common.exception.ResourceNotFoundException;
import com.example.backend.employee.dto.EmployeeResponseDto;
import com.example.backend.employee.entity.Employee;
import com.example.backend.employee.repository.EmployeeRepository;
import com.example.backend.user.dto.UserResponseDto;
import com.example.backend.user.entity.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import com.example.backend.employee.dto.EmployeeAssignStoreRequest;
import com.example.backend.employee.dto.EmployeeCardDto;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

        private final EmployeeRepository employeeRepository;
        private final UserRepository userRepository;

        public EmployeeController(EmployeeRepository employeeRepository, UserRepository userRepository) {
                this.employeeRepository = employeeRepository;
                this.userRepository = userRepository;
        }

        @GetMapping("/{id}")
        public EmployeeResponseDto getEmployee(@PathVariable Long id) {
                Employee e = employeeRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("employee", "id", id));

                return new EmployeeResponseDto(
                                e.getEmployeeId(),
                                e.getUserId(),
                                e.getPriority(),
                                e.getMinTime(),
                                e.getMaxTime(),
                                e.getNewcomer(),
                                e.getStoreId());
        }

        // マイページ用
        @GetMapping("/{id}/mypage")
        public UserResponseDto getMypage(@PathVariable Long id) {
                Employee e = employeeRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("employee", "id", id));

                Long userId = e.getUserId(); // Employeeに userId がある前提
                User u = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("user", "id", userId));

                return new UserResponseDto(
                                u.getUserId(),
                                u.getMailaddress(),
                                u.getName(),
                                u.getPhone(),
                                u.getAddress(),
                                u.getCompany());
        }

        @PatchMapping("/{id}/assign-store")
        public void assignStore(@PathVariable Long id,
                        @RequestBody EmployeeAssignStoreRequest req) {
                if (req.getStoreId() == null) {
                        throw new IllegalArgumentException("storeId は必須です");
                }

                Employee e = employeeRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("employee", "id", id));

                e.setStoreId(req.getStoreId());
                employeeRepository.save(e);
        }

        @GetMapping("/by-store")
        public List<EmployeeCardDto> listByStore(@RequestParam Long storeId) {
                var employees = employeeRepository.findByStoreId(storeId);

                return employees.stream().map(e -> {
                        User u = userRepository.findById(e.getUserId())
                                        .orElseThrow(() -> new ResourceNotFoundException("user", "id", e.getUserId()));
                        return new EmployeeCardDto(
                                        e.getEmployeeId(),
                                        u.getName(),
                                        u.getPhone(),
                                        u.getAddress());
                }).toList();
        }

}
