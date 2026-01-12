package com.hasan.springpostgrescrud.repository;

import com.hasan.springpostgrescrud.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
