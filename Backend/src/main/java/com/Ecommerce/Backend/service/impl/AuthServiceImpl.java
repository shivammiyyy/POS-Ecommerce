package com.Ecommerce.Backend.service.impl;

import com.Ecommerce.Backend.config.JwtProvider;
import com.Ecommerce.Backend.domain.UserRole;
import com.Ecommerce.Backend.exception.UserException;
import com.Ecommerce.Backend.mapper.UserMapper;
import com.Ecommerce.Backend.model.User;
import com.Ecommerce.Backend.payload.dto.UserDto;
import com.Ecommerce.Backend.payload.response.AuthResponse;
import com.Ecommerce.Backend.repository.UserRepository;
import com.Ecommerce.Backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final CustomUserImpl customUserImpl;

    @Override
    public AuthResponse Signup(UserDto userDto) throws UserException {
        User user = userRepository.findByEmail(userDto.getEmail());
        if (user != null) {
            throw new UserException("Username already exists");
        }

        if(userDto.getRole().equals(UserRole.ROLE_ADMIN)){
            throw new UserException("Admin role is not allowed");
        }

        User newUser = new User();
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        newUser.setRole(userDto.getRole());
        newUser.setFullName(userDto.getFullName());
        newUser.setPhone(userDto.getPhone());
        newUser.setLastLogin(
                LocalDateTime.now()
        );
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword());

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("success");
        authResponse.setUser(UserMapper.toDTO(savedUser));

        return authResponse;
    }

    @Override
    public AuthResponse Login(UserDto userDto) throws UserException, Exception {
        String email = userDto.getEmail();
        String password = userDto.getPassword();
        Authentication authentication = authenticate(email, password);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        String role = authorities.iterator().next().getAuthority();
        String jwt = jwtProvider.generateToken(authentication);
        User user = userRepository.findByEmail(email);

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login success");
        authResponse.setUser(UserMapper.toDTO(user));
        return authResponse;
    }

    private Authentication authenticate(String email, String password) throws Exception, UserException {
        UserDetails userDetails = customUserImpl.loadUserByUsername(email);

        if (userDetails == null) {
            throw new UserException("Invalid username or password");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new UserException("Incorrect password");
        }


        return new  UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    }
}
