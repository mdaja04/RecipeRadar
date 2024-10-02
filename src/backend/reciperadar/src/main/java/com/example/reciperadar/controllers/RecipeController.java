package com.example.reciperadar.controllers;

import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.services.RecipeService;
import com.example.reciperadar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
    private final RecipeService recipeService;
    private final UserService userService;

    @Autowired
    public RecipeController(RecipeService recipeService, UserService userService) {
        this.recipeService = recipeService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe, @RequestParam Long userId) {
        recipe.setId(userId);
        Recipe createdRecipe = recipeService.createRecipe(recipe);
        return ResponseEntity.ok(createdRecipe);
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
