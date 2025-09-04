package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.ProductDTO;
import com.Ecommerce.Backend.payload.response.ApiResponse;
import com.Ecommerce.Backend.service.ProductService;
import com.Ecommerce.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO productDTO,
                                             @RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.getUserFromJwtToken(jwt);
        return ResponseEntity.ok(
                productService.createProduct(
                        productDTO,
                        user
                )
        );
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductDTO>> getByStoreId(
            @PathVariable Long storeId,
            @RequestHeader("Authorization")String jwt) throws Exception {
        return ResponseEntity.ok(
                productService.getProductByStoreId(
                        storeId
                )
        );
    }

    @PatchMapping("{id}")
    public ResponseEntity<ProductDTO> update(
            @PathVariable Long id,
            @RequestBody ProductDTO productDTO,
            @RequestHeader("Authorization")String jwt
    ) throws Exception {
        User user = userService.getUserFromJwtToken(jwt);

        return ResponseEntity.ok(
                productService.updateProduct(
                        id,
                        productDTO,
                        user
                )
        );

    }

    @GetMapping("/store/{storeId}/search")
    public ResponseEntity<List<ProductDTO>> searchByKeyword(
            @PathVariable Long storeId,
            @RequestParam String keyword,
            @RequestHeader("Authorization")String jwt) throws Exception {


        return ResponseEntity.ok(
                productService.searchByKeyword(
                        storeId,
                        keyword
                )
        );
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse> delete(
            @PathVariable Long id,
            @RequestHeader("Authorization")String jwt
    ) throws Exception {
        User user = userService.getUserFromJwtToken(jwt);

        productService.deleteProduct(
                id,
                user
        );
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Delete the product successfully");
        return ResponseEntity.ok(apiResponse);
    }

}
