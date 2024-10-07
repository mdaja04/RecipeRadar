package com.example.reciperadar.controllers;

import com.example.reciperadar.entities.User;
import com.example.reciperadar.services.UserService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping(value = "/username")
    public String currentUserName(Principal principal) {
        return principal.getName();
    }
    @GetMapping(value = "/my-username")
    public String currentUserName(Authentication authentication) {
        return authentication.getName();
    }


    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/id")
    public ResponseEntity<Map<String, Object>> getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if the user is authenticated
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(401).body(Map.of("message", "User is not authenticated"));
        }

        // Get the principal object and ensure it's a UserDetails or custom User type
        if (!(authentication.getPrincipal() instanceof User)) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid user authentication."));
        }

        User currentUser = (User) authentication.getPrincipal();
        // Return just the user ID or username as a simple JSON object
        return ResponseEntity.ok(Map.of("userId", currentUser.getId(), "username", currentUser.getUsername()));
    }

    /*@PostMapping
    public void  registerNewUser(@RequestBody User user){
        userService.addNewUser(user);
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }

    @PutMapping(path="/{userId}")
    public void updateUser(
            @PathVariable("userId") Long userId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String surname,
            @RequestParam(required = false) String profileImageURL,
            @RequestParam(required = false) Boolean publicProfile,
            @RequestParam(required = false) LocalDate dob,
            @RequestParam(required = false) String email) {
        userService.updateUser(userId, name, username, email, surname, profileImageURL, publicProfile, dob);
    }*/

}
