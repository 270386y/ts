package com.example.backend.shiftdesired.dto;

import com.example.backend.shiftdesired.entity.ShiftDesired;

public class ShiftDesiredUpdateSituationRequest {
    private Long storeId;
    private ShiftDesired.Situation situation;

    public Long getStoreId() { return storeId; }
    public void setStoreId(Long storeId) { this.storeId = storeId; }

    public ShiftDesired.Situation getSituation() { return situation; }
    public void setSituation(ShiftDesired.Situation situation) { this.situation = situation; }
}
