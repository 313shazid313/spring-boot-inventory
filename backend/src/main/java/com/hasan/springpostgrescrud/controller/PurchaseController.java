package com.hasan.springpostgrescrud.controller;

import com.hasan.springpostgrescrud.entity.Item;
import java.util.List;
import com.hasan.springpostgrescrud.repository.ItemRepository;
import org.springframework.web.bind.annotation.*;

import com.hasan.springpostgrescrud.entity.Purchase;
import com.hasan.springpostgrescrud.repository.PurchaseRepository;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseRepository purchaseRepository;
    private final ItemRepository itemRepository;

    public PurchaseController(PurchaseRepository purchaseRepository,
            ItemRepository itemRepository) {
        this.purchaseRepository = purchaseRepository;
        this.itemRepository = itemRepository;
    }

    // POST: /api/purchases/1/4 -> Buy 4 quantity of item 1
    @PostMapping("/{itemId}/{qty}")
    public Purchase buyItem(@PathVariable Long itemId,
            @PathVariable Integer qty) {

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (item.getQuantity() < qty) {
            throw new RuntimeException("Not enough stock");
        }

        // Reduce stock
        item.setQuantity(item.getQuantity() - qty);
        itemRepository.save(item);

        // Create purchase
        Purchase purchase = new Purchase();
        purchase.setItem(item);
        purchase.setQuantity(qty);
        purchase.setTotalPrice(qty * item.getPrice());

        return purchaseRepository.save(purchase);
    }

    // GET: /api/purchases
    @GetMapping
    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

}
