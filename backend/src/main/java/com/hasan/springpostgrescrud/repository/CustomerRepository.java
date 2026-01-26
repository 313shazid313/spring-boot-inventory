package com.hasan.springpostgrescrud.repository;

import com.hasan.springpostgrescrud.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
