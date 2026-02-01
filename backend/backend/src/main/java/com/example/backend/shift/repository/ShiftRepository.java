package com.example.backend.shift.repository;

import com.example.backend.shift.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    List<Shift> findByStoreIdAndTimeStartGreaterThanEqualAndTimeFinishLessThanEqual(
            Long storeId, LocalDateTime from, LocalDateTime to);

    // 時間の重なり検出（store内で重なってたらtrue）
    @Query("""
                SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END
                FROM Shift s
                WHERE s.storeId = :storeId
                  AND s.timeStart < :timeFinish
                  AND s.timeFinish > :timeStart
            """)
    boolean existsOverlapping(
            @Param("storeId") Long storeId,
            @Param("timeStart") LocalDateTime timeStart,
            @Param("timeFinish") LocalDateTime timeFinish);

    @Query("""
                SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END
                FROM Shift s
                WHERE s.storeId = :storeId
                  AND s.shiftId <> :shiftId
                  AND s.timeStart < :timeFinish
                  AND s.timeFinish > :timeStart
            """)
    boolean existsOverlappingExcludingShift(
            @Param("storeId") Long storeId,
            @Param("shiftId") Long shiftId,
            @Param("timeStart") LocalDateTime timeStart,
            @Param("timeFinish") LocalDateTime timeFinish);
}
