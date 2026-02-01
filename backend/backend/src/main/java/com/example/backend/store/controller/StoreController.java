package com.example.backend.store.controller;

import com.example.backend.common.exception.ResourceNotFoundException;
import com.example.backend.store.dto.StoreDto;
import com.example.backend.store.entity.Store;
import com.example.backend.store.repository.StoreRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
public class StoreController {

    private final StoreRepository storeRepository;

    public StoreController(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @GetMapping
    public List<StoreDto> list() {
        return storeRepository.findAll().stream()
                .map(s -> new StoreDto(s.getStoreId(), s.getStoreName()))
                .toList();
    }

    @GetMapping("/{id}")
    public StoreDto get(@PathVariable Long id) {
        Store s = storeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("store", "id", id));
        return new StoreDto(s.getStoreId(), s.getStoreName());
    }
}
