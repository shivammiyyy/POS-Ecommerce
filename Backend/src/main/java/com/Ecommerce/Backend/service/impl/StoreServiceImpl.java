package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.domain.StoreStatus;
import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.mapper.StoreMapper;
import com.Ecommerce.Backend.model.Store;
import com.Ecommerce.Backend.model.StoreContact;
import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.StoreDTO;
import com.Ecommerce.Backend.repository.StoreRepository;
import com.Ecommerce.Backend.service.StoreService;
import com.Ecommerce.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final UserService userService;

    @Override
    public StoreDTO createStore(StoreDTO storeDTO, User user) {

        Store store = StoreMapper.toEntity(storeDTO, user);

        return StoreMapper.toDto(storeRepository.save(store));
    }

    @Override
    public StoreDTO getStoreById(Long id) throws Exception {

        Store store = storeRepository.findById(id).orElseThrow(
                ()-> new Exception("Store is not found")
        );
        return StoreMapper.toDto(store);
    }

    @Override
    public List<StoreDTO> getAllStores(){
        List<Store> dtos =  storeRepository.findAll();
        return dtos.stream().map(StoreMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public Store getStoreByAdmin() throws UserException {
        User admin = userService.getCurrentUser();
        return storeRepository.findByStoreAdminId(admin.getId());
    }

    @Override
    public StoreDTO updateStore(Long id, StoreDTO storeDTO) throws UserException {
        User currentUser = userService.getCurrentUser();
        Store existing = storeRepository.findByStoreAdminId(currentUser.getId());

        if(existing == null) {
            throw new UserException("Store is not found");
        }

        existing.setBrand(storeDTO.getBrand());
        existing.setDescription(storeDTO.getDescription());

        if(existing.getStoreType() == null) {
            existing.setStoreType(storeDTO.getStoreType());
        }
        if(existing.getContact() == null) {
            StoreContact contact = StoreContact.builder()
                                    .address(storeDTO.getContact().getAddress())
                    .phone(storeDTO.getContact().getPhone())
                    .email(storeDTO.getContact().getEmail())
                    .build();
            existing.setContact(contact);
        }
        Store updatedStore = storeRepository.save(existing);

        return StoreMapper.toDto(updatedStore);
    }

    @Override
    public void deleteStore(Long id) throws UserException {
        Store store = getStoreByAdmin();
        storeRepository.delete(store);

    }

    @Override
    public StoreDTO getStoreByEmployee() throws UserException {
        User currentUser = userService.getCurrentUser();

        if(currentUser == null){
            throw new UserException("You have no permission to do access the store");
        }
        return StoreMapper.toDto(currentUser.getStore());
    }

    @Override
    public StoreDTO moderateStore(Long id, StoreStatus status) throws Exception {
        Store store = storeRepository.findById(id).orElseThrow(
                ()-> new Exception("Store is not found")
        );

        store.setStatus(status);
        Store updatedStore = storeRepository.save(store);

        return StoreMapper.toDto(updatedStore);
    }
}
