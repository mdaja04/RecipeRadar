package com.example.reciperadar.controllers;

import com.example.reciperadar.dto.RecipeDto;
import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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


    @GetMapping("/id/{recipeId}")
    public ResponseEntity<Optional<Recipe>> getRecipeByRecipeId(
            @PathVariable Long recipeId) {
        Optional<Recipe> recipe = recipeService.getByRecipeId(recipeId);
        return ResponseEntity.ok(recipe);

    }

    @PostMapping("/favourites")
    public ResponseEntity<List<Recipe>> getFavouriteRecipes(@RequestBody List<Long> recipeIds) {
        List<Recipe> recipes = recipeService.getByRecipeIds(recipeIds);
        return ResponseEntity.ok(recipes);
    }

}
