package com.Ecommerce.Backend.repository;

import com.Ecommerce.Backend.model.Store;
import com.Ecommerce.Backend.payload.dto.StoreDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByStoreAdminId(Long storeAdminId);


}

