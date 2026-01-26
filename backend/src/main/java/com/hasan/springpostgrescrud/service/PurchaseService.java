package com.hasan.springpostgrescrud.service;

import org.springframework.stereotype.Service;

import com.hasan.springpostgrescrud.entity.Item;
import com.hasan.springpostgrescrud.entity.Purchase;
import com.hasan.springpostgrescrud.repository.ItemRepository;
import com.hasan.springpostgrescrud.repository.PurchaseRepository;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ItemRepository itemRepository;

    public PurchaseService(PurchaseRepository purchaseRepository,
                           ItemRepository itemRepository) {
        this.purchaseRepository = purchaseRepository;
        this.itemRepository = itemRepository;
    }

    public Purchase savePurchase(Purchase purchase) {

        Long itemId = purchase.getItem().getId();

        Item item = itemRepository.findById(itemId).orElseThrow();

        item.setQuantity(item.getQuantity() + purchase.getQuantity());

        itemRepository.save(item);

        purchase.setItem(item);

        return purchaseRepository.save(purchase);
    }
}
