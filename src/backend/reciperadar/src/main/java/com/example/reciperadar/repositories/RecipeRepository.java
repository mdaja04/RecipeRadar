package com.example.reciperadar.repositories;

import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findRecipesByUserId(Long userId);

    Optional<Recipe> findByIdAndUserId(Long id, Long userId);
}

