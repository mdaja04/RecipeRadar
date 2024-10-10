package com.example.reciperadar.repositories;

import com.example.reciperadar.entities.Favourites;
import com.example.reciperadar.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouritesRepository extends JpaRepository<Favourites, Long> {
    Favourites findByUsername(String username);

}
