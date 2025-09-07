package com.Ecommerce.Backend.mapper;

import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.UserDto;

import java.time.LocalDateTime;

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
    userDto.setBranchId(savedUser.getBranch()!=null?savedUser.getBranch().getId():null);
    userDto.setStoreId(savedUser.getStore()!=null?savedUser.getStore().getId():null);

    return userDto;
    }
    public static User toEntity(UserDto userDto) {
    User createdUser = new User();
    createdUser.setEmail(userDto.getEmail());
    createdUser.setFullName(userDto.getFullName());
    createdUser.setPhone(userDto.getPhone());
    createdUser.setCreatedAt(userDto.getCreatedAt());
    createdUser.setUpdatedAt(userDto.getUpdatedAt());
    createdUser.setLastLogin(userDto.getLastLogin());
    createdUser.setRole(userDto.getRole());
    createdUser.setPassword(userDto.getPassword());
    return createdUser;
    }
}
