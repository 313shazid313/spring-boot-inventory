package com.hasan.springpostgrescrud.repository;

import com.hasan.springpostgrescrud.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
