package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.model.User;

import java.util.List;

public interface UserService {
    User getUserFromJwtToken(String token) throws UserException;
    User getCurrentUser() throws UserException;
    User getUserByEmail(String email) throws UserException;
    User getUserById(long id) throws UserException;
    List<User> getAllUsers();


}
