    package com.hasan.springpostgrescrud.controller;

    import org.springframework.web.bind.annotation.*;
    import java.util.List;
    import org.springframework.data.domain.Sort;

    import com.hasan.springpostgrescrud.entity.Supplier;
    import com.hasan.springpostgrescrud.repository.SupplierRepository;

    @RestController
    @RequestMapping("/suppliers")
    public class SupplierController {

        private final SupplierRepository supplierRepository;

        public SupplierController(SupplierRepository supplierRepository) {
            this.supplierRepository = supplierRepository;
        }

        @GetMapping
        public List<Supplier> getAllSuppliers() {
            return supplierRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        }

        @PostMapping
        public Supplier createSupplier(@RequestBody Supplier supplier) {
            return supplierRepository.save(supplier);
        }

        @PutMapping("/{id}")
        public Supplier updateSupplier(
                @PathVariable Long id,
                @RequestBody Supplier updatedSupplier) {

            return supplierRepository.findById(id)
                    .map(supplier -> {
                        supplier.setName(updatedSupplier.getName());
                        supplier.setEmail(updatedSupplier.getEmail());
                        supplier.setPhoneNumber(updatedSupplier.getPhoneNumber());

                        return supplierRepository.save(supplier);
                    })
                    .orElseThrow(() -> new RuntimeException("Supplier not found with id " + id));
        }

        @GetMapping("/{id}")
        public Supplier getSupplierById(@PathVariable Long id) {
            return supplierRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Supplier not found with id " + id));
        }

    }
