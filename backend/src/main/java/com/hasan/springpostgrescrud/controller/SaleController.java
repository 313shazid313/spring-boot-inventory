package com.hasan.springpostgrescrud.controller;

import org.springframework.web.bind.annotation.*;
import com.hasan.springpostgrescrud.repository.SaleRepository;
import com.hasan.springpostgrescrud.repository.ItemRepository;
import com.hasan.springpostgrescrud.repository.CustomerRepository;
import com.hasan.springpostgrescrud.entity.Sale;
import com.hasan.springpostgrescrud.entity.SaleItem;
import com.hasan.springpostgrescrud.entity.Item;
import com.hasan.springpostgrescrud.entity.Customer;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/sales")
public class SaleController {

    private final SaleRepository saleRepository;
    private final ItemRepository itemRepository;
    private final CustomerRepository customerRepository;

    public SaleController(SaleRepository saleRepository,
            ItemRepository itemRepository,
            CustomerRepository customerRepository) {
        this.saleRepository = saleRepository;
        this.itemRepository = itemRepository;
        this.customerRepository = customerRepository;
    }

    @PostMapping("/sell")
    public Sale sellItems(@RequestBody Map<String, Object> request) {

        // 1. Get customer
        Long customerId = Long.valueOf(request.get("customerId").toString());
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // 2. Create sale
        Sale sale = new Sale();
        sale.setCustomer(customer);
        sale.setSaleDate(LocalDateTime.now());

        // ✅ NEW: set invoice number
        if (request.get("invoiceNumber") != null) {
            sale.setInvoiceNumber(request.get("invoiceNumber").toString());
        }

        double totalAmount = 0;
        List<SaleItem> saleItems = new ArrayList<>();

        // 3. Read items list
        List<Map<String, Object>> items = (List<Map<String, Object>>) request.get("items");

        for (Map<String, Object> itemData : items) {

            Long itemId = Long.valueOf(itemData.get("itemId").toString());
            Integer quantity = Integer.valueOf(itemData.get("quantity").toString());

            Item item = itemRepository.findById(itemId)
                    .orElseThrow(() -> new RuntimeException("Item not found"));

            if (item.getQuantity() < quantity) {
                throw new RuntimeException("Not enough stock for " + item.getName());
            }

            // reduce stock
            item.setQuantity(item.getQuantity() - quantity);
            itemRepository.save(item);

            SaleItem saleItem = new SaleItem();
            saleItem.setSale(sale);
            saleItem.setItem(item);
            saleItem.setQuantity(quantity);
            saleItem.setPrice(item.getPrice());

            totalAmount += item.getPrice() * quantity;
            saleItems.add(saleItem);
        }

        sale.setTotalAmount(totalAmount);
        sale.setSaleItems(saleItems);

        return saleRepository.save(sale);
    }

    @GetMapping
    public List<Sale> getAllSalesDesc() {
        return saleRepository.findAll(Sort.by(Sort.Direction.DESC, "saleDate"));
    }

    @GetMapping("/{id}")
    public Sale getSaleById(@PathVariable Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found with id: " + id));
    }
}
