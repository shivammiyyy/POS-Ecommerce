package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.model.Customer;
import com.Ecommerce.Backend.repository.CustomerRepository;
import com.Ecommerce.Backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public Customer createCustomer(Customer customer) {

        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) throws Exception {
        Customer updatedCustomer = customerRepository.findById(id).orElseThrow(() -> new Exception("Customer Not Found"));
        updatedCustomer.setFullName(customer.getFullName());
        updatedCustomer.setPhone(customer.getPhone());
        return customerRepository.save(updatedCustomer);
    }

    @Override
    public void deleteCustomer(Long id) throws Exception {
        Customer updatedCustomer = customerRepository.findById(id).orElseThrow(() -> new Exception("Customer Not Found"));

        customerRepository.delete(updatedCustomer);
    }

    @Override
    public Customer getCustomer(Long id) throws Exception {
        return customerRepository.findById(id).orElseThrow(() -> new Exception("Customer Not Found"));
    }

    @Override
    public List<Customer> getAllCustomers()  {
        return customerRepository.findAll();
    }

    @Override
    public List<Customer> searchCustomer(String keyword) {
        return customerRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                keyword,keyword
        );
    }
}
