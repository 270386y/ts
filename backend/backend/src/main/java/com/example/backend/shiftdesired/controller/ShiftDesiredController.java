package com.example.backend.shiftdesired.controller;

import com.example.backend.shiftdesired.dto.ShiftDesiredApproveRequest;
import com.example.backend.shiftdesired.dto.ShiftDesiredCreateRequest;
import com.example.backend.shiftdesired.dto.ShiftDesiredCreateResponse;
import com.example.backend.shiftdesired.dto.ShiftDesiredDto;
import com.example.backend.shiftdesired.dto.ShiftDesiredUpdateSituationRequest;
import com.example.backend.shiftdesired.entity.ShiftDesired;
import com.example.backend.shiftdesired.service.ShiftDesiredService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/shift-desired")
public class ShiftDesiredController {

    private final ShiftDesiredService shiftDesiredService;

    public ShiftDesiredController(ShiftDesiredService shiftDesiredService) {
        this.shiftDesiredService = shiftDesiredService;
    }

    // 従業員：希望シフト作成
    @PostMapping
    public ShiftDesiredCreateResponse create(@Valid @RequestBody ShiftDesiredCreateRequest req) {
        Long id = shiftDesiredService.create(
                req.getEmployeeId(),
                req.getStoreId(),
                req.getTimeStart(),
                req.getTimeFinish());
        return new ShiftDesiredCreateResponse(id);
    }

    // 従業員：自分の希望一覧
    @GetMapping
    public List<ShiftDesiredDto> list(
            @RequestParam Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to) {
        return shiftDesiredService.listByEmployee(employeeId, from, to);
    }

    // 雇用者：承諾（storeId必須）
    @PatchMapping("/{id}/approve")
    public void approve(@PathVariable("id") Long id,
            @RequestBody ShiftDesiredApproveRequest request) {

        if (request.getStoreId() == null) {
            throw new IllegalArgumentException("storeId は必須です");
        }
        if (request.getShiftId() == null) {
            throw new IllegalArgumentException("shiftId は必須です");
        }

        shiftDesiredService.approve(id, request.getStoreId(), request.getShiftId());
    }

    // 雇用者：却下（storeId必須）
    @PatchMapping("/{id}/reject")
    public void reject(@PathVariable("id") Long id,
            @RequestBody ShiftDesiredApproveRequest request) {

        if (request.getStoreId() == null) {
            throw new IllegalArgumentException("storeId は必須です");
        }

        shiftDesiredService.reject(id, request.getStoreId());
    }

    @GetMapping("/by-store")
    public List<ShiftDesiredDto> listByStore(
            @RequestParam Long storeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to,
            @RequestParam(required = false) ShiftDesired.Situation situation) {
        return shiftDesiredService.listByStore(storeId, from, to, situation);
    }

    @PatchMapping("/{id}/situation")
    public void updateSituation(
            @PathVariable("id") Long id,
            @RequestBody ShiftDesiredUpdateSituationRequest req) {
        if (req.getStoreId() == null) {
            throw new IllegalArgumentException("storeId は必須です");
        }
        if (req.getSituation() == null) {
            throw new IllegalArgumentException("situation は必須です");
        }

        shiftDesiredService.updateSituation(id, req.getStoreId(), req.getSituation());
    }

    // 被雇用者 希望シフトキャンセル
    @PatchMapping("/{id}/cancel")
    public void cancel(
            @PathVariable("id") Long id,
            @RequestBody ShiftDesiredApproveRequest request) {
        if (request.getStoreId() == null) {
            throw new IllegalArgumentException("storeId は必須です");
        }
        shiftDesiredService.cancel(id, request.getStoreId());
    }

}
