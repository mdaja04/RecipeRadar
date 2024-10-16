package com.example.reciperadar.controllers;

import com.example.reciperadar.dto.AddFavouriteDto;
import com.example.reciperadar.dto.AddItemDto;
import com.example.reciperadar.entities.Favourites;
import com.example.reciperadar.entities.ShoppingList;
import com.example.reciperadar.services.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shopping-list")
public class ShoppingListController {
    private final ShoppingListService shoppingListService;

    @Autowired
    public ShoppingListController(ShoppingListService shoppingListService){
        this.shoppingListService = shoppingListService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody AddItemDto data){
        ShoppingList updatedShoppingList = shoppingListService.addShoppingListItem(data.getUsername(), data.getItem());
        return ResponseEntity.ok(updatedShoppingList);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<String>> getShoppingList(@PathVariable String username){
        List<String> shoppingListItems = shoppingListService.getShoppingListItems(username);
        return ResponseEntity.ok(shoppingListItems);
    }

    @DeleteMapping("/delete/{username}/{item}")
    public ResponseEntity<?> deleteFavourite(@PathVariable String username, @PathVariable String item){
        ShoppingList updatedShoppingList = shoppingListService.deleteShoppingListItem(username, item);
        return ResponseEntity.ok(updatedShoppingList);
    }


}
