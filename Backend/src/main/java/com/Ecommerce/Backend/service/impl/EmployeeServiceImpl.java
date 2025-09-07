package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.domain.UserRole;
import com.Ecommerce.Backend.mapper.BranchMapper;
import com.Ecommerce.Backend.mapper.UserMapper;
import com.Ecommerce.Backend.model.Branch;
import com.Ecommerce.Backend.model.Store;
import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.UserDto;
import com.Ecommerce.Backend.repository.BranchRepository;
import com.Ecommerce.Backend.repository.StoreRepository;
import com.Ecommerce.Backend.repository.UserRepository;
import com.Ecommerce.Backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final BranchRepository branchRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto createStoreEmployee(UserDto employee, Long storeId) throws Exception {
        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new Exception("Store with id: " + storeId + " not found")
        );
        Branch branch = null;
        if(employee.getRole() == UserRole.ROLE_STORE_MANAGER){
            if(employee.getBranchId() == null){
                throw new Exception("BranchId is required to create manager");
            }
            branch = branchRepository.findById(employee.getBranchId()).orElseThrow(
                    ()-> new Exception("Branch not found")
            );
        }
        User user = UserMapper.toEntity(employee);
        user.setBranch(branch);
        user.setStore(store);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedEmployee = userRepository.save(user);

        if(employee.getRole() == UserRole.ROLE_STORE_MANAGER && branch != null){
            branch.setManager(savedEmployee);
            branchRepository.save(branch);
        }

        return UserMapper.toDTO(savedEmployee);
    }

    @Override
    public UserDto createBranchEmployee(UserDto employee, Long branchId) throws Exception {
        Branch branch = branchRepository.findById(employee.getBranchId()).orElseThrow(
                ()-> new Exception("Branch not found")
        );

        if(employee.getRole() == UserRole.ROLE_BRANCH_CASHIER ||
        employee.getRole() == UserRole.ROLE_STORE_MANAGER){
            User user = UserMapper.toEntity(employee);
            user.setBranch(branch);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return UserMapper.toDTO(userRepository.save(user));
        }
         throw new Exception("BRANCH ROLE IS NOT SUPPORTED");
    }

    @Override
    public User updateEmployee(Long employeeId, UserDto employeeDetails) throws Exception {
        User existingEmployee = userRepository.findById(employeeId).orElseThrow(
                ()-> new Exception("employee with id: " + employeeId + " not found")
        );
        Branch branch = branchRepository.findById(employeeDetails.getBranchId()).orElseThrow(
                ()-> new Exception("branch with id: " + employeeDetails.getBranchId() + " not found")
        );
        existingEmployee.setEmail(employeeDetails.getEmail());
        existingEmployee.setFullName(employeeDetails.getFullName());
        existingEmployee.setPassword(employeeDetails.getPassword());
        existingEmployee.setRole(employeeDetails.getRole());
        existingEmployee.setBranch(branch);
        return userRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) throws Exception {
        User employee = userRepository.findById(employeeId).orElseThrow(
                ()->new Exception("Employee with id: " + employeeId + " not found")
        );
        userRepository.delete(employee);
    }


    @Override
    public List<UserDto> findStoreEmployees(Long storeId, UserRole role) throws Exception {
        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new Exception("Store with id: " + storeId + " not found")
        );
        return userRepository.findByStore(store).stream().filter(user -> role==null || user.getRole()==role)
                .map(UserMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<UserDto> findBranchEmployees(Long branchId, UserRole role) throws Exception {
        Branch branch = branchRepository.findById(branchId).orElseThrow(
                ()->new Exception("Branch with id: " + branchId + " not found")
        );
        return userRepository.findByBranchId(branchId)
                .stream().filter(
                    user -> role==null || user.getRole()==role
                ).map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }
}
