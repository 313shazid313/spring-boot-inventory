package com.hasan.springpostgrescrud.repository;

import com.hasan.springpostgrescrud.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
