package com.example.reciperadar.controllers;

import com.example.reciperadar.dto.LoginUserDto;
import com.example.reciperadar.dto.RegisterUserDto;
import com.example.reciperadar.dto.UserResponseDto;
import com.example.reciperadar.dto.VerifyUserDto;
import com.example.reciperadar.entities.User;
import com.example.reciperadar.responses.LoginResponse;
import com.example.reciperadar.services.AuthenticationService;
import com.example.reciperadar.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")

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
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto){
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
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
