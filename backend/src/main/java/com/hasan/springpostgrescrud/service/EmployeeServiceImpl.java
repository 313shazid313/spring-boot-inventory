package com.hasan.springpostgrescrud.service;

import com.hasan.springpostgrescrud.dto.EmployeeDto;
import com.hasan.springpostgrescrud.entity.Employee;
import com.hasan.springpostgrescrud.exeption.DuplicateResourceException;
import com.hasan.springpostgrescrud.exeption.ResourceNotFoundException;
import com.hasan.springpostgrescrud.mapper.EmployeeMapper;
import com.hasan.springpostgrescrud.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
// import java.lang.module.ResolutionException;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        // Check if email already exists
        if (employeeRepository.existsByEmail(employeeDto.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        // // Check if same first name + last name already exists
        // if (employeeRepository.existsByFirstNameAndLastName(
        // employeeDto.getFirstName(),
        // employeeDto.getLastName())) {
        // throw new DuplicateResourceException("Employee name already exists");
        // }

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with given id: " + id));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .sorted(Comparator.comparing(Employee::getId).reversed())
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {

        // 1. Find existing employee
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        // 2. Update fields
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        // 3. Save updated entity
        Employee updatedEmployee = employeeRepository.save(employee);

        // 4. Convert entity to DTO and return
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with given id: " + id));
        employeeRepository.delete(employee);
    }
}
