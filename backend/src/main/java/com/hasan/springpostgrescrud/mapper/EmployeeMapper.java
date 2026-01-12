package com.hasan.springpostgrescrud.mapper;

import com.hasan.springpostgrescrud.dto.EmployeeDto;
import com.hasan.springpostgrescrud.entity.Employee;

public class EmployeeMapper {

    public  static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }

    public  static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}
