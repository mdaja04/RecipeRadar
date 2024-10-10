package com.example.reciperadar.services;

import com.example.reciperadar.dto.RecipeDto;
import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    /*public List<Recipe> allRecipesByUserId(Long userId){
        List<Recipe> recipes = new ArrayList<>();
        recipeRepository.findRecipesByUserId(userId);
        return recipes;
    }*/

    public Recipe createRecipe(RecipeDto recipe) {
        Recipe recipe1 = new Recipe(recipe.getUsername(), recipe.getImage(), recipe.getTitle(), recipe.getServes(),recipe.getIngredients(),recipe.getInstructions());
        return recipeRepository.save(recipe1);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public List<Recipe> getRecipesByUsername(String username) {
        return recipeRepository.findByUsername(username);
    }

    /*public Recipe getRecipeByIdAndUserId(Long recipeId, Long userId) {
        return recipeRepository.findByIdAndUserId(recipeId, userId)
                .orElseThrow(() -> new RuntimeException("Recipe not found or not accessible by this user."));
    }*/

    public Recipe getByUsernameAndRecipeId(String username, Long recipeId){
        return recipeRepository.findByUsernameAndId(username, recipeId);
    }


}
