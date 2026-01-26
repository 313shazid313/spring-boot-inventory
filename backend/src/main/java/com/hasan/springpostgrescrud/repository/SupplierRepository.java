package com.hasan.springpostgrescrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

import com.hasan.springpostgrescrud.entity.Supplier;
import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    List<Supplier> findAllWithPurchases();

}
