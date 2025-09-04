package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.ProductDTO;

import java.util.List;

public interface ProductService
{
    ProductDTO createProduct(ProductDTO productDTO, User user) throws Exception;
    ProductDTO updateProduct(Long id, ProductDTO productDTO, User user) throws Exception;
    void deleteProduct(Long id, User user) throws Exception;
    List<ProductDTO> getProductByStoreId(Long StoreId);
    List<ProductDTO> searchByKeyword(Long storeId, String keyword);}
