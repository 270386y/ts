package com.example.backend.shift.controller;

import com.example.backend.shift.dto.ShiftCreateRequest;
import com.example.backend.shift.dto.ShiftCreateResponse;
import com.example.backend.shift.dto.ShiftDto;
import com.example.backend.shift.service.ShiftService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/shifts")
public class ShiftController {

    private final ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    // 作成
    @PostMapping
    public ShiftCreateResponse create(@RequestBody ShiftCreateRequest req) {
        Long id = shiftService.create(req);
        return new ShiftCreateResponse(id);
    }

    // 1件取得
    @GetMapping("/{id}")
    public ShiftDto get(@PathVariable("id") Long id) {
        return shiftService.get(id);
    }

    // 店舗×期間一覧（カレンダー表示用）
    // 例:
    // /api/shifts/by-store?storeId=1&from=2026-01-01T00:00:00&to=2026-02-01T00:00:00
    @GetMapping("/by-store")
    public List<ShiftDto> listByStore(@RequestParam Long storeId,
            @RequestParam LocalDateTime from,
            @RequestParam LocalDateTime to) {
        return shiftService.listByStore(storeId, from, to);
    }

    // 削除
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        shiftService.delete(id);
    }

    @PatchMapping("/{shiftId}/cancel")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancel(@PathVariable Long shiftId) {
        shiftService.cancelShift(shiftId);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable("id") Long id,
            @RequestBody com.example.backend.shift.dto.ShiftUpdateRequest req) {
        shiftService.update(id, req);
    }
}
