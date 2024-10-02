package com.example.reciperadar.services;

import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.entities.User;
import com.example.reciperadar.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> allRecipesByUserId(Long userId){
        List<Recipe> recipes = new ArrayList<>();
        recipeRepository.findRecipesByUserId(userId);
        return recipes;
    }

    public void addNewRecipe(Recipe recipe) {
        recipeRepository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeByIdAndUser(Long recipeId, Long userId) {
        return recipeRepository.findByIdAndUserId(recipeId, userId)
                .orElseThrow(() -> new RuntimeException("Recipe not found or not accessible by this user."));
    }


}
