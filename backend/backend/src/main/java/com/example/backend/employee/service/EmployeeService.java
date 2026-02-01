package com.example.backend.employee.service;

import com.example.backend.common.exception.ResourceNotFoundException;
import com.example.backend.employee.entity.Employee;
import com.example.backend.employee.repository.EmployeeRepository;
import com.example.backend.store.entity.Store;
import com.example.backend.store.repository.StoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final StoreRepository storeRepository;

    public EmployeeService(EmployeeRepository employeeRepository,
            StoreRepository storeRepository) {
        this.employeeRepository = employeeRepository;
        this.storeRepository = storeRepository;
    }

    @Transactional
    public void assignStore(Long employeeId, Long storeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("employee", "id", employeeId));

        storeRepository.findById(storeId)
                .orElseThrow(() -> new ResourceNotFoundException("store", "id", storeId));

        employee.setStoreId(storeId);
    }

}
