package com.hasan.springpostgrescrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

import com.hasan.springpostgrescrud.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

}
