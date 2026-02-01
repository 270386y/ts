package com.example.backend.shift.service;

import com.example.backend.common.exception.ConflictException;
import com.example.backend.common.exception.ResourceNotFoundException;
import com.example.backend.employer.repository.EmployerRepository;
import com.example.backend.shift.dto.ShiftCreateRequest;
import com.example.backend.shift.dto.ShiftDto;
import com.example.backend.shift.entity.Shift;
import com.example.backend.shift.repository.ShiftRepository;
import com.example.backend.shiftdesired.entity.ShiftDesired;
import com.example.backend.shiftdesired.repository.ShiftDesiredRepository;
import com.example.backend.shiftrule.entity.ShiftRule;
import com.example.backend.shiftrule.repository.ShiftRuleRepository;
import com.example.backend.store.repository.StoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class ShiftService {

    private final ShiftRepository shiftRepository;
    private final StoreRepository storeRepository;
    private final ShiftRuleRepository shiftRuleRepository;
    private final EmployerRepository employerRepository;
    private final ShiftDesiredRepository shiftDesiredRepository;

    public ShiftService(ShiftRepository shiftRepository,
            StoreRepository storeRepository,
            ShiftRuleRepository shiftRuleRepository,
            EmployerRepository employerRepository,
            ShiftDesiredRepository shiftDesiredRepository) {
        this.shiftRepository = shiftRepository;
        this.storeRepository = storeRepository;
        this.shiftRuleRepository = shiftRuleRepository;
        this.employerRepository = employerRepository;
        this.shiftDesiredRepository = shiftDesiredRepository;
    }

    @Transactional
    public Long create(ShiftCreateRequest req) {
        if (req.getTimeStart() == null || req.getTimeFinish() == null) {
            throw new IllegalArgumentException("timeStart/timeFinish is required");
        }
        if (!req.getTimeStart().isBefore(req.getTimeFinish())) {
            throw new ConflictException("開始時刻は終了時刻より前である必要があります");
        }
        if (req.getStoreId() == null || req.getShiftruleId() == null || req.getCreatedBy() == null) {
            throw new IllegalArgumentException("storeId/shiftruleId/createdBy is required");
        }

        // store存在チェック
        storeRepository.findById(req.getStoreId())
                .orElseThrow(() -> new ResourceNotFoundException("store not found: id=" + req.getStoreId()));

        // shiftrule存在チェック + store一致チェック
        ShiftRule rule = shiftRuleRepository.findById(req.getShiftruleId())
                .orElseThrow(() -> new ResourceNotFoundException("shiftRule not found: id=" + req.getShiftruleId()));
        if (!rule.getStoreId().equals(req.getStoreId())) {
            throw new ConflictException("shiftRuleがstoreに紐づいていません");
        }

        // employer存在チェック
        employerRepository.findById(req.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("employer not found: id=" + req.getCreatedBy()));

        // 重なりチェック（同一storeで時間が被るSHIFTは作らない）
        boolean overlapped = shiftRepository.existsOverlapping(req.getStoreId(), req.getTimeStart(),
                req.getTimeFinish());
        if (overlapped) {
            throw new ConflictException("同じ店舗で時間帯が重複するSHIFTが既に存在します");
        }

        Shift shift = new Shift();
        shift.setStoreId(req.getStoreId());
        shift.setShiftruleId(req.getShiftruleId());
        shift.setTimeStart(req.getTimeStart());
        shift.setTimeFinish(req.getTimeFinish());
        shift.setCreatedBy(req.getCreatedBy());

        Shift saved = shiftRepository.save(shift);
        return saved.getShiftId();
    }

    @Transactional(readOnly = true)
    public ShiftDto get(Long shiftId) {
        Shift s = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new ResourceNotFoundException("shift not found: id=" + shiftId));
        return toDto(s);
    }

    @Transactional(readOnly = true)
    public List<ShiftDto> listByStore(Long storeId, LocalDateTime from, LocalDateTime to) {
        if (storeId == null || from == null || to == null) {
            throw new IllegalArgumentException("storeId/from/to is required");
        }
        if (!from.isBefore(to)) {
            throw new IllegalArgumentException("from must be before to");
        }

        // store存在チェック（UIのカレンダーで変なstoreId来たときに早めに落とす）
        storeRepository.findById(storeId)
                .orElseThrow(() -> new ResourceNotFoundException("store not found: id=" + storeId));

        List<Shift> list = shiftRepository
                .findByStoreIdAndTimeStartGreaterThanEqualAndTimeFinishLessThanEqual(storeId, from, to);

        return list.stream().map(this::toDto).toList();
    }

    @Transactional
    public void delete(Long shiftId) {
        Shift s = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new ResourceNotFoundException("shift not found: id=" + shiftId));
        shiftRepository.delete(s);
    }

    private ShiftDto toDto(Shift s) {
        return new ShiftDto(
                s.getShiftId(),
                s.getStoreId(),
                s.getShiftruleId(),
                s.getTimeStart(),
                s.getTimeFinish(),
                s.getCreatedBy());
    }

    @Transactional
    public void update(Long shiftId, com.example.backend.shift.dto.ShiftUpdateRequest req) {

        if (req.getTimeStart() == null || req.getTimeFinish() == null) {
            throw new IllegalArgumentException("timeStart/timeFinish is required");
        }
        if (!req.getTimeStart().isBefore(req.getTimeFinish())) {
            throw new ConflictException("開始時刻は終了時刻より前である必要があります");
        }
        if (req.getStoreId() == null || req.getShiftruleId() == null || req.getCreatedBy() == null) {
            throw new IllegalArgumentException("storeId/shiftruleId/createdBy is required");
        }

        Shift target = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new ResourceNotFoundException("shift", "id", shiftId));

        // store存在
        storeRepository.findById(req.getStoreId())
                .orElseThrow(() -> new ResourceNotFoundException("store", "id", req.getStoreId()));

        // rule存在 + store一致
        ShiftRule rule = shiftRuleRepository.findById(req.getShiftruleId())
                .orElseThrow(() -> new ResourceNotFoundException("shiftRule", "id", req.getShiftruleId()));
        if (!rule.getStoreId().equals(req.getStoreId())) {
            throw new ConflictException("shiftruleId", "shiftRuleがstoreに紐づいていません");
        }

        // employer存在
        employerRepository.findById(req.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("employer", "id", req.getCreatedBy()));

        // 重なりチェック（自分以外）
        boolean overlapped = shiftRepository.existsOverlappingExcludingShift(
                req.getStoreId(), shiftId, req.getTimeStart(), req.getTimeFinish());
        if (overlapped) {
            throw new ConflictException("time", "同じ店舗で時間帯が重複するSHIFTが既に存在します");
        }

        target.setStoreId(req.getStoreId());
        target.setShiftruleId(req.getShiftruleId());
        target.setTimeStart(req.getTimeStart());
        target.setTimeFinish(req.getTimeFinish());
        target.setCreatedBy(req.getCreatedBy());
    }

    @Transactional
    public void cancelShift(Long shiftId) {

        // ① SHIFT存在チェック
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new ResourceNotFoundException("shift", "id", shiftId));

        // ② 紐づく希望シフトを hold に戻す
        shiftDesiredRepository.findByShiftId(shiftId).ifPresent(sd -> {
            sd.setSituation(ShiftDesired.Situation.hold);
            sd.setShiftId(null);
        });

        // ③ SHIFT削除
        shiftRepository.delete(shift);
    }

    @Transactional
    public void revertToHoldByShiftId(Long shiftId) {
        ShiftDesired sd = shiftDesiredRepository
                .findByShiftId(shiftId)
                .orElseThrow(() -> new ResourceNotFoundException("shiftDesired", "shiftId", shiftId));

        sd.setSituation(ShiftDesired.Situation.hold);
        sd.setShiftId(null);
    }
}
