package com.Ecommerce.Backend.controller;


import com.Ecommerce.Backend.payload.dto.CategoryDTO;
import com.Ecommerce.Backend.payload.response.ApiResponse;
import com.Ecommerce.Backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO)throws Exception {
        return ResponseEntity.ok().body(categoryService.createCategory(categoryDTO));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<CategoryDTO>> getCategoryByStoreId(@PathVariable Long storeId){
        return ResponseEntity.ok().body(categoryService.getCategoriesByStore(storeId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody CategoryDTO categoryDTO, @PathVariable Long id)throws Exception {
        return ResponseEntity.ok().body(categoryService.updateCategory(id, categoryDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@RequestBody CategoryDTO categoryDTO, @PathVariable Long id)throws Exception {
        categoryService.deleteCategory(id);

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Category deleted successfully");
        return ResponseEntity.ok(
                apiResponse
        );
    }
}
