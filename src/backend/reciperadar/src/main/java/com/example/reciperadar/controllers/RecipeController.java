package com.example.reciperadar.controllers;

import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.entities.User;
import com.example.reciperadar.services.RecipeService;
import com.example.reciperadar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class RecipeController {
    private final RecipeService recipeService;
    private final UserService userService;

    @Autowired
    public RecipeController(RecipeService recipeService, UserService userService) {
        this.recipeService = recipeService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRecipe(@RequestBody Recipe recipe) {
        // Get the currently authenticated user from the existing `/me` logic
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User is not authenticated"));
        }

        // Retrieve the user from the authentication context
        User currentUser = (User) authentication.getPrincipal();

        // Associate the recipe with the current user
        recipe.setUser(currentUser);

        // Save the recipe using the RecipeService
        Recipe savedRecipe = recipeService.createRecipe(recipe);

        // Return the saved recipe object
        return ResponseEntity.ok(savedRecipe);
    }



    @GetMapping("/user/{username}")
    public ResponseEntity<List<Recipe>> getRecipesByUsername(@PathVariable String username) {
        Long userId = userService.getUserIdByUsername(username); // Convert username to userId
        return ResponseEntity.ok(recipeService.allRecipesByUserId(userId));
    }

    @GetMapping("/{recipeId}/user/{username}")
    public ResponseEntity<Recipe> getRecipeByIdAndUsername(
            @PathVariable Long recipeId,
            @PathVariable String username) {
        Long userId = userService.getUserIdByUsername(username);
        return ResponseEntity.ok(recipeService.getRecipeByIdAndUserId(recipeId, userId));
    }

}
