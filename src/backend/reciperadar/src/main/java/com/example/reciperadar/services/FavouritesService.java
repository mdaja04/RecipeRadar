package com.example.reciperadar.services;


import com.example.reciperadar.entities.Favourites;
import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.repositories.FavouritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavouritesService {

    private final FavouritesRepository favouritesRepository;

    @Autowired
    public FavouritesService(FavouritesRepository favouritesRepository) {
        this.favouritesRepository = favouritesRepository;
    }

    public List<Long> getFavouriteRecipeIds(String username){
        Favourites favourites = favouritesRepository.findByUsername(username);
        if(favourites == null){
            return new ArrayList<>();
        }
        return favourites.getFavouriteRecipeIds();
    }

    public Favourites addFavouriteRecipeId(String username, Long recipeId){
        Favourites favourites = favouritesRepository.findByUsername(username);
        if(favourites == null){
            favourites = new Favourites(username);
        }
        favourites.getFavouriteRecipeIds().add(recipeId);
        return favouritesRepository.save(favourites);
    }


    public Favourites deleteFavouriteRecipeId(String username, Long recipeId) {
        Favourites favourites = favouritesRepository.findByUsername(username);

        favourites.getFavouriteRecipeIds().remove(recipeId);
        return favouritesRepository.save(favourites);
    }
}
