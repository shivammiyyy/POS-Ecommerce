package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.mapper.UserMapper;
import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.UserDto;
import com.Ecommerce.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @RequestMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(
            @RequestHeader("Authorization") String jwt
     ) throws Exception, UserException {
        User user = userService.getUserFromJwtToken(jwt);

        return ResponseEntity.ok(UserMapper.toDTO(user) );
    }

    @RequestMapping("/{id}")
    public <id> ResponseEntity<UserDto> getUserById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id
    ) throws Exception, UserException {
        User user = userService.getUserById(id);
        if(user == null){
            throw new UserException("User not found");
        }
        return ResponseEntity.ok(UserMapper.toDTO(user) );
    }


}
