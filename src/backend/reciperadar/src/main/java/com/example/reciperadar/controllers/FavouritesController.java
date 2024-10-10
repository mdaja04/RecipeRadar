package com.example.reciperadar.controllers;

import com.example.reciperadar.entities.Favourites;
import com.example.reciperadar.entities.Recipe;
import com.example.reciperadar.services.FavouritesService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favourites")
public class FavouritesController {
    private final FavouritesService favouritesService;

    @Autowired
    public FavouritesController(FavouritesService favouritesService) {
        this.favouritesService = favouritesService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addFavourite(@RequestParam String username, @RequestParam Long recipeId){
        Favourites updatedFavourites = favouritesService.addFavouriteRecipeId(username, recipeId);
        return ResponseEntity.ok(updatedFavourites);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Long>> getFavourites(@PathVariable String username){
        List<Long> favouriteRecipeIds = favouritesService.getFavouriteRecipeIds(username);
        return ResponseEntity.ok(favouriteRecipeIds);
    }

}
