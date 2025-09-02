package com.Ecommerce.Backend.mapper;

import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.UserDto;

public class UserMapper {

    public static UserDto toDTO(User savedUser) {

    UserDto userDto = new UserDto();
    userDto.setId(savedUser.getId());
    userDto.setEmail(savedUser.getEmail());
    userDto.setRole(savedUser.getRole());
//    userDto.setPassword(savedUser.getPassword());
    userDto.setFullName(savedUser.getFullName());
    userDto.setPhone(savedUser.getPhone());
    userDto.setCreatedAt(savedUser.getCreatedAt());
    userDto.setUpdatedAt(savedUser.getUpdatedAt());
    userDto.setLastLogin(savedUser.getLastLogin());

    return userDto;
    }
}
