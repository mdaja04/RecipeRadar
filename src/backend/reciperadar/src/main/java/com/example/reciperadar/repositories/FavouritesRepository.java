package com.example.reciperadar.repositories;

import com.example.reciperadar.entities.Recipe;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouritesRepository {
    List<Recipe> findByUsername(String username);

}
