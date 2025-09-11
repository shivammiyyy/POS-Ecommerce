package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.domain.StoreStatus;
import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.model.Store;
import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.StoreDTO;

import java.util.List;

public interface StoreService {

    StoreDTO createStore(StoreDTO storeDTO, User user);

    StoreDTO getStoreById(Long id) throws Exception;

    List<StoreDTO> getAllStores() throws UserException;

    Store getStoreByAdmin() throws UserException;

    StoreDTO updateStore(Long id, StoreDTO storeDTO) throws UserException;

    void deleteStore(Long id) throws Exception;

    StoreDTO getStoreByEmployee() throws UserException;

    StoreDTO moderateStore(Long id, StoreStatus status) throws Exception;

}
