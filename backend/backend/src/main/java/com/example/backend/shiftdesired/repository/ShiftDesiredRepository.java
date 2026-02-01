package com.example.backend.shiftdesired.repository;

import com.example.backend.shiftdesired.entity.ShiftDesired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

import java.util.Optional;

public interface ShiftDesiredRepository extends JpaRepository<ShiftDesired, Long> {

  List<ShiftDesired> findByEmployee_EmployeeIdAndTimeStartGreaterThanEqualAndTimeStartLessThanOrderByTimeStartAsc(
      Long employeeId, LocalDateTime from, LocalDateTime to);

  Optional<ShiftDesired> findByShiftId(Long shiftId);

  @Query("""
          select count(sd) > 0
          from ShiftDesired sd
          where sd.employee.employeeId = :employeeId
            and sd.situation <> com.example.backend.shiftdesired.entity.ShiftDesired$Situation.cancel
            and sd.timeStart < :timeFinish
            and :timeStart < sd.timeFinish
      """)
  boolean existsOverlapping(
      @Param("employeeId") Long employeeId,
      @Param("timeStart") LocalDateTime timeStart,
      @Param("timeFinish") LocalDateTime timeFinish);

  List<ShiftDesired> findByStore_StoreIdAndTimeStartGreaterThanEqualAndTimeStartLessThanOrderByTimeStartAsc(
      Long storeId, LocalDateTime from, LocalDateTime to);

  List<ShiftDesired> findByStore_StoreIdAndSituationAndTimeStartGreaterThanEqualAndTimeStartLessThanOrderByTimeStartAsc(
      Long storeId, ShiftDesired.Situation situation, LocalDateTime from, LocalDateTime to);
}
