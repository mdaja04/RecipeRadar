package com.example.reciperadar.services;


import com.example.reciperadar.entities.Favourites;
import com.example.reciperadar.entities.ShoppingList;
import com.example.reciperadar.repositories.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShoppingListService {
    private final ShoppingListRepository shoppingListRepository;

    @Autowired
    public ShoppingListService(ShoppingListRepository shoppingListRepository){
        this.shoppingListRepository = shoppingListRepository;
    }

    public List<String> getShoppingListItems(String username){
        ShoppingList shoppingList = shoppingListRepository.findByUsername(username);
        if(shoppingList == null){
            return new ArrayList<>();
        }
        return shoppingList.getShoppingListItems();
    }

    public ShoppingList addShoppingListItem(String username, String item){
        ShoppingList shoppingList = shoppingListRepository.findByUsername(username);
        if(shoppingList == null){
            shoppingList = new ShoppingList(username);
        }
        shoppingList.getShoppingListItems().add(item);
        return shoppingListRepository.save(shoppingList);
    }

    public ShoppingList deleteShoppingListItem(String username, String item){
        ShoppingList shoppingList = shoppingListRepository.findByUsername(username);
        shoppingList.getShoppingListItems().remove(item);
        return shoppingListRepository.save(shoppingList);
    }

}
