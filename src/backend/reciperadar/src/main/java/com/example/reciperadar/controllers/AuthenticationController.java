package com.example.reciperadar.controllers;

import com.example.reciperadar.dto.LoginUserDto;
import com.example.reciperadar.dto.RegisterUserDto;
import com.example.reciperadar.dto.UserResponseDto;
import com.example.reciperadar.dto.VerifyUserDto;
import com.example.reciperadar.entities.User;
import com.example.reciperadar.responses.LoginResponse;
import com.example.reciperadar.services.AuthenticationService;
import com.example.reciperadar.services.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;


    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        // Map the `User` entity to `UserResponseDto`
        UserResponseDto responseDto = new UserResponseDto(
                registeredUser.getId(),
                registeredUser.getUsername(),
                registeredUser.getEmail()
        );

        return ResponseEntity.ok(responseDto);
    }



    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto, HttpServletResponse response) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        if (!authenticatedUser.isEnabled()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "message", "Account not verified",
                    "verified", false,
                    "userId", authenticatedUser.getId()
            ));
        }

        String jwtToken = jwtService.generateToken(authenticatedUser);
        long expirationTime = jwtService.getExpirationTime();

        Cookie cookie = new Cookie("token", jwtToken);
        //cookie.setHttpOnly(true);
        cookie.setSecure(false); // Disable secure for local development (use true in production)
        cookie.setPath("/");
        cookie.setMaxAge((int) ((expirationTime - System.currentTimeMillis()) / 1000));

        response.addCookie(cookie);

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("message", "Login successful");
        responseBody.put("verified", true);
        responseBody.put("expirationTime", expirationTime);

        return ResponseEntity.ok(responseBody);
    }





    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto){
        try{
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email){
        try{
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
