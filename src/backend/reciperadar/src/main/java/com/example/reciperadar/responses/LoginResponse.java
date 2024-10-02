package com.example.reciperadar.responses;

import jakarta.servlet.http.Cookie;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private Cookie cookie;
    private long expiresIn;
    private boolean isEnabled;
    public LoginResponse(Cookie cookie, long expiresIn,boolean isEnabled){
        this.cookie = cookie;
        this.expiresIn = expiresIn;
        this.isEnabled = isEnabled;
    }


}
