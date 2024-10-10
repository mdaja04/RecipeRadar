package com.example.reciperadar.repositories;

import com.example.reciperadar.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {


    List<Recipe> findByUsername(String username);

    Optional<Recipe> findById(Long recipeId );
}

