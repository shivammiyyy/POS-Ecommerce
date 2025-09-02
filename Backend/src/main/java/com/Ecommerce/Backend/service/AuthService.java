package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.payload.dto.UserDto;
import com.Ecommerce.Backend.payload.response.AuthResponse;

public interface AuthService {

    AuthResponse Signup(UserDto userDto) throws UserException;
    AuthResponse Login(UserDto userDto) throws UserException, Exception;
}
