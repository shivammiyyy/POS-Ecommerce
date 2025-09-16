package com.Ecommerce.Backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtConstant {
    public static final String JWT_SECRET = "ead12815ebbe2bc3f3dc6344a2b8a9ce3ecf2690d7596e90a96e9f645c53e26e";

    public static final String JWT_HEADER = "Authorization";
}
