package com.example.backend.employer.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "EMPLOYER")
public class Employer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employer_id")
    private Long employerId;

    public Employer() {}
    public Long getEmployerId() { return employerId; }
    public void setEmployerId(Long employerId) { this.employerId = employerId; }
}
