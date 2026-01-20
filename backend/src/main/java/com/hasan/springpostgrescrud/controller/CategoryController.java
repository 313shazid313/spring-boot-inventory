package com.hasan.springpostgrescrud.controller;

import com.hasan.springpostgrescrud.entity.Category;
import com.hasan.springpostgrescrud.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryRepository categoryRepo;

    public CategoryController(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    @PostMapping
    public Category create(@RequestBody Category category) {
        return categoryRepo.save(category);
    }

    @GetMapping
    public List<Category> getAll() {
        return categoryRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @GetMapping("/{id}")
    public Category getById(@PathVariable Long id) {
        return categoryRepo.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        categoryRepo.deleteById(id);
        return "Category Deleted";
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category updatedCategory) {
        return categoryRepo.findById(id)
                .map(category -> {
                    category.setName(updatedCategory.getName());
                    category.setDescription(updatedCategory.getDescription());
                    return categoryRepo.save(category);
                })
                .orElseGet(() -> {
                    // Optional: if category not found, create a new one with the given ID
                    updatedCategory.setId(id);
                    return categoryRepo.save(updatedCategory);
                });
    }

}
