package com.hasan.springpostgrescrud.repository;

import com.hasan.springpostgrescrud.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
