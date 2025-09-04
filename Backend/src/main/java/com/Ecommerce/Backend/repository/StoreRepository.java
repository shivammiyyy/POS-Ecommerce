package com.Ecommerce.Backend.repository;

import com.Ecommerce.Backend.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Store findByStoreAdminId(Long storeAdminId);
}

