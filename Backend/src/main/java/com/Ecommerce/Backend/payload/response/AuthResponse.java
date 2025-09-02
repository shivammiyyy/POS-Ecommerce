package com.Ecommerce.Backend.payload.response;

import com.Ecommerce.Backend.payload.dto.UserDto;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;
    private String message;
    private UserDto user;


}
