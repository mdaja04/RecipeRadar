package com.example.reciperadar.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class ShoppingList {
    @Id
    @SequenceGenerator(
            name = "shopping_list_sequence",
            sequenceName = "shopping_list_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "shopping_list_sequence"
    )
    private Long id;

    @Column(unique = true)
    private String username;

    @ElementCollection
    @CollectionTable(name = "shopping_list_items", joinColumns = @JoinColumn(name = "shopping_list_id"))
    private List<String> shoppingListItems = new ArrayList<>();

    public ShoppingList(String username) {
        this.username = username;
        this.shoppingListItems = new ArrayList<>();
    }

}
