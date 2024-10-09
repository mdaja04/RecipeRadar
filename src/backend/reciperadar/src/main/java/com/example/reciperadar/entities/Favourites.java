package com.example.reciperadar.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Favourites {
    @Id
    @SequenceGenerator(
            name = "favourites_sequence",
            sequenceName = "favourites_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "favourites_sequence"
    )
    private Long id;

    @Column(unique = true)
    private String username;

    @ElementCollection
    private List<Long> favouriteRecipeIds;

    public Favourites(String username, List<Long> favouriteRecipeIds) {
        this.username = username;
        this.favouriteRecipeIds = favouriteRecipeIds;
    }

    public Favourites() {

    }
}
