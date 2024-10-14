package com.example.reciperadar.services;

import com.example.reciperadar.dto.RecipeDto;
import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.entities.User;
import com.example.reciperadar.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }


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



    public Optional<Recipe> getByRecipeId(Long recipeId){
        return recipeRepository.findById(recipeId);
    }


    public List<Recipe> getByRecipeIds(List<Long> recipeIds) {
        return recipeRepository.findAllByIdIn(recipeIds);
    }

    public List<Recipe> getRandomRecipes(int limit) {
        return recipeRepository.findRandomRecipes(PageRequest.of(0, limit)).getContent();
    }

    public List<Recipe> searchRecipes(String searchQuery){
        return recipeRepository.findByTitleContainingIgnoreCase(searchQuery);
    }

    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(()->new IllegalStateException("Recipe not found"));
        recipeRepository.delete(recipe);
    }


}
