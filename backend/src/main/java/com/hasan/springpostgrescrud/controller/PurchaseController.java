package com.hasan.springpostgrescrud.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;
import com.hasan.springpostgrescrud.entity.Purchase;
import com.hasan.springpostgrescrud.service.PurchaseService;
import com.hasan.springpostgrescrud.repository.PurchaseRepository;
import java.util.List;

@RestController
@RequestMapping("/purchases")
public class PurchaseController {
    private final PurchaseRepository purchaseRepository;
    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseRepository purchaseRepository, PurchaseService purchaseService) {
        this.purchaseRepository = purchaseRepository;
        this.purchaseService = purchaseService;
    }

    @PostMapping
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return purchaseService.savePurchase(purchase);
    }

    @GetMapping
    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll(
                Sort.by(Sort.Direction.DESC, "purchaseDate"));
    }

    @GetMapping("/{id}")
    public Purchase getPurchaseById(@PathVariable Long id) {
        return purchaseRepository.findById(id).orElse(null);
    }
    
}
