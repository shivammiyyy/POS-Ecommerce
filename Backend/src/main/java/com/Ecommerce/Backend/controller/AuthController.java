package com.Ecommerce.Backend.controller;

import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.payload.dto.UserDto;
import com.Ecommerce.Backend.payload.response.AuthResponse;
import com.Ecommerce.Backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;


    // http://localhost:5000/api/auth/signup
    @RequestMapping("/signup")
    public ResponseEntity<AuthResponse>signupHandler(
            @RequestBody UserDto userDto
    ) throws  UserException {
        return ResponseEntity.ok(
                authService.Signup(userDto)
        );

    }

    // http://localhost:5000/api/auth/signup
    @RequestMapping("/login")
    public ResponseEntity<AuthResponse>loginHandler(
            @RequestBody UserDto userDto
    ) throws Exception, UserException {
        return ResponseEntity.ok(
                authService.Login(userDto)
        );

    }

}
