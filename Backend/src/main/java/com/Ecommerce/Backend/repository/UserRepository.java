package com.Ecommerce.Backend.repository;

import com.Ecommerce.Backend.model.Branch;
import com.Ecommerce.Backend.model.Store;
import com.Ecommerce.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    List<User> findByStore(Store store);
    List<User> findByBranchId(Long branchId);

}
