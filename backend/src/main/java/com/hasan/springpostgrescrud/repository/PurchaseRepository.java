package com.hasan.springpostgrescrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hasan.springpostgrescrud.entity.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
}
