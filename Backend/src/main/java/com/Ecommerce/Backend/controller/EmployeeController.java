package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.domain.UserRole;
import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.UserDto;
import com.Ecommerce.Backend.payload.response.ApiResponse;
import com.Ecommerce.Backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/store/{storeId}")
    public ResponseEntity<UserDto> createStoreEmployee(@PathVariable Long storeId
    ,@RequestBody UserDto userDto)throws Exception {
        UserDto employee = employeeService.createStoreEmployee(userDto,storeId);

        return ResponseEntity.ok(employee);
    }

    @PostMapping("/branch/{branchId}")
    public ResponseEntity<UserDto> createBranchEmployee(@PathVariable Long branchId
            ,@RequestBody UserDto userDto)throws Exception {
        UserDto employee = employeeService.createBranchEmployee(userDto,branchId);

        return ResponseEntity.ok(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateEmployee(@PathVariable Long id
            ,@RequestBody UserDto userDto)throws Exception {
        User employee = employeeService.updateEmployee(id,userDto);

        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteEmployee(@PathVariable Long id)throws Exception {
        employeeService.deleteEmployee(id);

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Employee deleted successfully");
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("store/{id}")
    public ResponseEntity<List<UserDto>> storeEmployee(@PathVariable Long id
            , @RequestParam(required = false) UserRole userRole)throws Exception {
        List<UserDto> employee = employeeService.findStoreEmployees(id,userRole);

        return ResponseEntity.ok(employee);
    }

    @GetMapping("branch/{id}")
    public ResponseEntity<List<UserDto>> branchEmployee(@PathVariable Long id
            , @RequestParam(required = false) UserRole userRole)throws Exception {
        List<UserDto> employee = employeeService.findBranchEmployees(id,userRole);
        return ResponseEntity.ok(employee);
    }




}
