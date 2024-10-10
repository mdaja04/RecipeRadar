package com.example.reciperadar.services;


import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.repositories.FavouritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouritesService {

    private final FavouritesRepository favouritesRepository;

    @Autowired
    public FavouritesService(FavouritesRepository favouritesRepository) {
        this.favouritesRepository = favouritesRepository;
    }

    public List<Recipe> getFavouriteRecipes(String username){
        return favouritesRepository.findByUsername(username);
    }
}
