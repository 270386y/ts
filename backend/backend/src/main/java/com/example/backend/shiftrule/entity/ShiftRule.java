package com.example.backend.shiftrule.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "SHIFT_RULE")
public class ShiftRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shiftrule_id")
    private Long shiftruleId;

    @Column(name = "store_id", nullable = false)
    private Long storeId;

    public ShiftRule() {}

    public Long getShiftruleId() { return shiftruleId; }
    public Long getStoreId() { return storeId; }

    public void setShiftruleId(Long shiftruleId) { this.shiftruleId = shiftruleId; }
    public void setStoreId(Long storeId) { this.storeId = storeId; }
}
