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
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        try {
            // Authenticate the user and get the authenticated user object
            User authenticatedUser = authenticationService.authenticate(loginUserDto);

            // Generate the JWT token if authentication is successful
            String jwtToken = jwtService.generateToken(authenticatedUser);

            // Return a LoginResponse object with the verified field set to true
            return ResponseEntity.ok(new LoginResponse(jwtToken, jwtService.getExpirationTime(), true));

        } catch (RuntimeException e) {
            // If user is not verified, return a response with a verified field set to false
            if (e.getMessage().contains("Account not verified")) {
                return ResponseEntity.ok(new LoginResponse(null, 0, false));  // No token, not verified
            }

            // If some other error occurred (e.g., invalid credentials), return a 403 response
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponse(null, 0, false));
        }
    }



    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}