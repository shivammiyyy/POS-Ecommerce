package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.config.JwtProvider;
import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.repository.UserRepository;
import com.Ecommerce.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User getUserFromJwtToken(String token) throws UserException {
        String email = jwtProvider.getEmailFromToken(token);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserException("User not found");
        }
        return user;
    }

    @Override
    public User getCurrentUser() throws UserException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UserException("User not found");
        }
        return null;
    }

    @Override
    public User getUserByEmail(String email) throws UserException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserException("Invalid Email...");

        }
        return null;
    }

    @Override
    public User getUserById(long id) throws UserException {
        return userRepository.findById(id).orElseThrow(
                ()-> new UserException("USER NOT FOUND")
        );
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
