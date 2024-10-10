package com.example.reciperadar.controllers;

import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.services.FavouritesService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/favourites")
public class FavouritesController {
    private final FavouritesService favouritesService;

    @Autowired
    public FavouritesController(FavouritesService favouritesService) {
        this.favouritesService = favouritesService;
    }

    @GetMapping("my-favourites")
    public ResponseEntity<List<Recipe>> getFavouriteRecipes(String username){
        List<Recipe> recipes = favouritesService.getFavouriteRecipes(username);
        return ResponseEntity.ok(recipes);
    }

}
