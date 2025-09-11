package com.Ecommerce.Backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtConstant {
    @Value("${JWT.SECRET}")
    public static  String JWT_SECRET;
    public static final String JWT_HEADER = "Authorization";
}
