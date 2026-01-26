package com.hasan.springpostgrescrud.controller;

import com.hasan.springpostgrescrud.entity.Customer;
import com.hasan.springpostgrescrud.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id,
            @RequestBody Customer customer) {

        Customer existing = customerRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        existing.setName(customer.getName());
        existing.setEmail(customer.getEmail());
        existing.setPhoneNumber(customer.getPhoneNumber());

        return customerRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerRepository.deleteById(id);
    }
}
