package com.example.backend.shiftrequest;

import com.example.backend.shiftrequest.dto.ShiftRequestCreateRequest;
import com.example.backend.shiftrequest.dto.ShiftRequestCreateResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shift-requests")
public class ShiftRequestController {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ShiftRequestCreateResponse create(@Valid @RequestBody ShiftRequestCreateRequest req) {
        // TODO: 後でService呼んでDB保存に差し替える
        return new ShiftRequestCreateResponse(true, "created (temporary no-db)");
    }
}
