package com.example.reciperadar.controllers;

import com.example.reciperadar.entities.RegistrationRequest;
import com.example.reciperadar.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="api/registration")
@AllArgsConstructor
public class RegistrationController {
    private RegistrationService registrationService;
    public String register(@RequestBody RegistrationRequest registrationRequest){
        return registrationService.register(registrationRequest);
    }

}
