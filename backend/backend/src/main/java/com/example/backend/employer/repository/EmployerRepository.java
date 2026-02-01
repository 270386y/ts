package com.example.backend.employer.repository;


import com.example.backend.employer.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EmployerRepository extends JpaRepository<Employer, Long> {}
