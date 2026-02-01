package com.example.backend.shiftdesired.service;

import com.example.backend.common.exception.ConflictException;
import com.example.backend.common.exception.ResourceNotFoundException;
import com.example.backend.employee.entity.Employee;
import com.example.backend.employee.repository.EmployeeRepository;
import com.example.backend.shiftdesired.dto.ShiftDesiredDto;
import com.example.backend.shiftdesired.entity.ShiftDesired;
import com.example.backend.shiftdesired.repository.ShiftDesiredRepository;
import com.example.backend.store.entity.Store;
import com.example.backend.store.repository.StoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ShiftDesiredService {

    private final ShiftDesiredRepository shiftDesiredRepository;
    private final EmployeeRepository employeeRepository;
    private final StoreRepository storeRepository;

    public ShiftDesiredService(ShiftDesiredRepository shiftDesiredRepository,
            EmployeeRepository employeeRepository,
            StoreRepository storeRepository) {
        this.shiftDesiredRepository = shiftDesiredRepository;
        this.employeeRepository = employeeRepository;
        this.storeRepository = storeRepository;
    }

    @Transactional
    public Long create(Long employeeId, Long storeId, LocalDateTime timeStart, LocalDateTime timeFinish) {

        // 1) 存在チェック
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("employee", "id", employeeId));

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new ResourceNotFoundException("store", "id", storeId));

        // 2) 重複チェック（同一従業員の希望が時間で重なるのを禁止）
        boolean overlap = shiftDesiredRepository.existsOverlapping(employeeId, timeStart, timeFinish);
        if (overlap) {
            throw new ConflictException("timeRange", "指定した時間帯が既存の希望シフトと重複しています");
        }

        // 従業員がこの店舗に所属しているかチェック
        if (employee.getStoreId() == null || !employee.getStoreId().equals(storeId)) {
            throw new ConflictException("storeId", "この店舗に所属していないため希望シフトを出せません");
        }

        // 3) 保存
        ShiftDesired sd = new ShiftDesired();
        sd.setEmployee(employee);
        sd.setStore(store);
        sd.setTimeStart(timeStart);
        sd.setTimeFinish(timeFinish);
        sd.setSituation(ShiftDesired.Situation.hold);

        return shiftDesiredRepository.save(sd).getStoreDesiredId();
    }

    @Transactional(readOnly = true)
    public List<ShiftDesiredDto> listByEmployee(Long employeeId, LocalDateTime from, LocalDateTime to) {

        employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("employee", "id", employeeId));

        var list = shiftDesiredRepository
                .findByEmployee_EmployeeIdAndTimeStartGreaterThanEqualAndTimeStartLessThanOrderByTimeStartAsc(
                        employeeId, from, to);

        return list.stream()
                .map(sd -> new ShiftDesiredDto(
                        sd.getStoreDesiredId(),
                        sd.getEmployee().getEmployeeId(),
                        sd.getStore().getStoreId(),
                        sd.getTimeStart(),
                        sd.getTimeFinish(),
                        sd.getSituation()))
                .toList();
    }

    /**
     * 雇用者が「自店舗の希望シフト」を承諾する（storeIdチェック付き）
     * 変更可：hold / rejection → approval
     */
    @Transactional
    public void approve(Long storeDesiredId, Long employerStoreId, Long shiftId) {
        ShiftDesired sd = shiftDesiredRepository.findById(storeDesiredId)
                .orElseThrow(() -> new ResourceNotFoundException("shiftDesired", "id", storeDesiredId));

        Long targetStoreId = sd.getStore().getStoreId();
        if (!targetStoreId.equals(employerStoreId)) {
            throw new ConflictException("storeId", "この店舗の希望シフトではありません");
        }

        if (sd.getSituation() == ShiftDesired.Situation.cancel) {
            throw new ConflictException("situation", "cancel の希望は承認できません");
        }

        if (shiftId == null) {
            throw new ConflictException("shiftId", "shiftId が必要です");
        }

        sd.setSituation(ShiftDesired.Situation.approval);
        sd.setShiftId(shiftId); // 確定SHIFTと紐づける
    }

    /**
     * 雇用者が「自店舗の希望シフト」を却下する（storeIdチェック付き）
     * 変更可：hold / approval → rejection
     */
    @Transactional
    public void reject(Long storeDesiredId, Long employerStoreId) {
        ShiftDesired sd = shiftDesiredRepository.findById(storeDesiredId)
                .orElseThrow(() -> new ResourceNotFoundException("shiftDesired", "id", storeDesiredId));

        Long targetStoreId = sd.getStore().getStoreId();
        if (!targetStoreId.equals(employerStoreId)) {
            throw new ConflictException("storeId", "この店舗の希望シフトではありません");
        }

        if (sd.getSituation() == ShiftDesired.Situation.cancel) {
            throw new ConflictException("situation", "cancel の希望は却下できません");
        }

        sd.setSituation(ShiftDesired.Situation.rejection);
    }

    /**
     * （任意）店側一覧表示などに使える：1件取得
     */
    @Transactional(readOnly = true)
    public ShiftDesiredDto getOne(Long storeDesiredId) {
        ShiftDesired sd = shiftDesiredRepository.findById(storeDesiredId)
                .orElseThrow(() -> new ResourceNotFoundException("shiftDesired", "id", storeDesiredId));
        return new ShiftDesiredDto(sd.getStoreDesiredId(),
                sd.getEmployee().getEmployeeId(),
                sd.getStore().getStoreId(),
                sd.getTimeStart(),
                sd.getTimeFinish(),
                sd.getSituation());
    }

    @Transactional(readOnly = true)
    public List<ShiftDesiredDto> listByStore(Long storeId, LocalDateTime from, LocalDateTime to,
            ShiftDesired.Situation situation) {

        var list = (situation == null)
                ? shiftDesiredRepository
                        .findByStore_StoreIdAndTimeStartGreaterThanEqualAndTimeStartLessThanOrderByTimeStartAsc(storeId,
                                from, to)
                : shiftDesiredRepository
                        .findByStore_StoreIdAndSituationAndTimeStartGreaterThanEqualAndTimeStartLessThanOrderByTimeStartAsc(
                                storeId, situation, from, to);

        return list.stream()
                .map(sd -> new ShiftDesiredDto(
                        sd.getStoreDesiredId(),
                        sd.getEmployee().getEmployeeId(),
                        sd.getStore().getStoreId(),
                        sd.getTimeStart(),
                        sd.getTimeFinish(),
                        sd.getSituation()))
                .toList();
    }

    @Transactional
    public void updateSituation(Long storeDesiredId, Long employerStoreId, ShiftDesired.Situation newSituation) {
        ShiftDesired sd = shiftDesiredRepository.findById(storeDesiredId)
                .orElseThrow(() -> new ResourceNotFoundException("shiftDesired", "id", storeDesiredId));

        // 店舗チェック（必要なら）
        if (!sd.getStore().getStoreId().equals(employerStoreId)) {
            throw new ConflictException("storeId", "この店舗の希望シフトではありません");
        }

        // ここでルールを決める
        // 例：cancelは従業員操作に限定したいなら弾く
        // if (newSituation == ShiftDesired.Situation.cancel) {
        // throw new ConflictException("situation", "cancel への変更は許可されていません");
        // }

        sd.setSituation(newSituation);
    }

    @Transactional
    public void cancel(Long id, Long storeId) {
        ShiftDesired sd = shiftDesiredRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("希望シフトが見つかりません"));

        // storeIdチェック（他店舗のデータを触れないように）
        if (!sd.getStore().getStoreId().equals(storeId)) {
            throw new IllegalArgumentException("storeId が不正です");
        }

        // 承認待ち(hold)だけ取消可
        if (sd.getSituation() != ShiftDesired.Situation.hold) {
            throw new ConflictException("この希望シフトは取消できません");
        }

        sd.setSituation(ShiftDesired.Situation.cancel);
        // saveは不要（JPAのdirty checkingで更新される）
    }

}
