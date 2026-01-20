package com.hasan.springpostgrescrud.controller;

import com.hasan.springpostgrescrud.entity.Category;
import com.hasan.springpostgrescrud.entity.Item;
import com.hasan.springpostgrescrud.repository.CategoryRepository;
import com.hasan.springpostgrescrud.repository.ItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemRepository itemRepo;
    private final CategoryRepository categoryRepo;

    public ItemController(ItemRepository itemRepo, CategoryRepository categoryRepo) {
        this.itemRepo = itemRepo;
        this.categoryRepo = categoryRepo;
    }

    @PostMapping("/{categoryId}")
    public Item createItem(@PathVariable Long categoryId, @RequestBody Item item) {
        Category category = categoryRepo.findById(categoryId).orElse(null);
        item.setCategory(category);
        return itemRepo.save(item);
    }

    @GetMapping
    public List<Item> getAll() {
        return itemRepo.findAll();
    }

    @GetMapping("/{id}")
    public Item getById(@PathVariable Long id) {
        return itemRepo.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        itemRepo.deleteById(id);
        return "Item Deleted";
    }

@PutMapping("/{id}")
public Item updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
    return itemRepo.findById(id)
            .map(item -> {

                if (updatedItem.getName() != null)
                    item.setName(updatedItem.getName());
                if (updatedItem.getQuantity() != null)
                    item.setQuantity(updatedItem.getQuantity());
                if (updatedItem.getPrice() != null)
                    item.setPrice(updatedItem.getPrice());

                if (updatedItem.getCategory() != null &&
                    updatedItem.getCategory().getId() != null) {

                    Category category = categoryRepo
                            .findById(updatedItem.getCategory().getId())
                            .orElse(null);
                    item.setCategory(category);
                }

                return itemRepo.save(item);
            })
            .orElse(null);
}


}
