package com.Ecommerce.Backend.service;

import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.payload.dto.UserDto;
import com.Ecommerce.Backend.payload.response.AuthResponse;

public interface AuthService {

    AuthResponse signup(UserDto userDto) throws UserException;
    AuthResponse login(UserDto userDto) throws  Exception;
}
