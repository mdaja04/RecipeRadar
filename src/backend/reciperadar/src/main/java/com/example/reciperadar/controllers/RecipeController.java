package com.example.reciperadar.controllers;

import com.example.reciperadar.dto.RecipeDto;
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
    public ResponseEntity<?> createRecipe(@RequestBody RecipeDto recipe) {
        // Save the recipe directly since username is included in the request body
        Recipe savedRecipe = recipeService.createRecipe(recipe);
        return ResponseEntity.ok(savedRecipe);
    }




    /*@GetMapping("/user/{username}")
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
    }*/

}
