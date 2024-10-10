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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class RecipeController {
    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }


    @PostMapping("/create")
    public ResponseEntity<?> createRecipe(
            @RequestParam("username") String username,
            @RequestParam("title") String title,
            @RequestParam("serves") Integer serves,
            @RequestParam("ingredients") String ingredients,
            @RequestParam("instructions") String instructions,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        byte[] imageBytes = image != null ? image.getBytes() : null;
        RecipeDto recipeDto = new RecipeDto(username, imageBytes, title, serves, ingredients, instructions);
        Recipe savedRecipe = recipeService.createRecipe(recipeDto);
        return ResponseEntity.ok(savedRecipe);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Recipe>> getRecipesByUsername(@PathVariable String username){
        List<Recipe> recipes = recipeService.getRecipesByUsername(username);
        return ResponseEntity.ok(recipes);
    }


    @GetMapping("/{username}/{recipeId}")
    public ResponseEntity<Recipe> getRecipeByUsernameAndRecipeId(
            @PathVariable Long recipeId,
            @PathVariable String username) {
        Recipe recipe = recipeService.getByUsernameAndRecipeId(username, recipeId);
        return ResponseEntity.ok(recipe);

    }

}
