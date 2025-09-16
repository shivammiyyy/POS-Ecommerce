package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.model.Customer;
import com.Ecommerce.Backend.payload.response.ApiResponse;
import com.Ecommerce.Backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping()
    public ResponseEntity<Customer> create(@RequestBody Customer customer){
        return ResponseEntity.ok(customerService.createCustomer(customer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> update(@PathVariable Long id, @RequestBody Customer customer) throws Exception {
        return ResponseEntity.ok(customerService.updateCustomer(id,customer));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) throws Exception {
         customerService.deleteCustomer(id);
         ApiResponse apiResponse = new ApiResponse();
         apiResponse.setMessage("Customer deleted successfully");
         return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(customerService.getCustomer(id));
    }

    @GetMapping()
    public ResponseEntity<List<Customer>> getAll() throws Exception {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Customer>> search(@RequestParam String q) throws Exception {
        return ResponseEntity.ok(customerService.searchCustomer(q));
    }




}
