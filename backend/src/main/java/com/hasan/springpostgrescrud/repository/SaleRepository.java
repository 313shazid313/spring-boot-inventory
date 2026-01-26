package com.hasan.springpostgrescrud.repository;

import com.hasan.springpostgrescrud.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {}