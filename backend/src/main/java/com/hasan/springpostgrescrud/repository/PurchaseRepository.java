package com.hasan.springpostgrescrud.repository;

import com.hasan.springpostgrescrud.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
}
