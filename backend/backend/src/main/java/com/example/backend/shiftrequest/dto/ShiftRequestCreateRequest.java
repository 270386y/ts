package com.example.backend.shiftrequest.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class ShiftRequestCreateRequest {

    @NotNull
    private Long userId; // いったん仮。後で認証から取るなら消す

    @NotNull
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "date must be yyyy-MM-dd")
    private String date;

    @NotNull
    @Pattern(regexp = "\\d{2}:\\d{2}", message = "start must be HH:mm")
    private String start;

    @NotNull
    @Pattern(regexp = "\\d{2}:\\d{2}", message = "end must be HH:mm")
    private String end;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getStart() { return start; }
    public void setStart(String start) { this.start = start; }

    public String getEnd() { return end; }
    public void setEnd(String end) { this.end = end; }
}
