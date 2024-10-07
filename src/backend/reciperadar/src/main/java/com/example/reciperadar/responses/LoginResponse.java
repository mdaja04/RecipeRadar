package com.example.reciperadar.responses;

import jakarta.servlet.http.Cookie;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private long expiresIn;
    private boolean verified;

    public LoginResponse(String token, long expiresIn, boolean verified) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.verified = verified;

    }
}