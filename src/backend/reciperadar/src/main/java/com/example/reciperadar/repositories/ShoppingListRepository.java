package com.example.reciperadar.repositories;

import com.example.reciperadar.entities.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
    ShoppingList findByUsername(String username);
}
