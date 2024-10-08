package com.example.reciperadar.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @SequenceGenerator(
            name = "recipe_sequence",
            sequenceName = "recipe_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "recipe_sequence"
    )
    private Long id;

    private String username;  // Store the creator's username

    private byte[] image;



    private String title;

    private Integer serves;

    @Column(columnDefinition = "TEXT")
    private String ingredients;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    public Recipe(String username, byte[] image, String title, Integer serves, String ingredients, String instructions) {
        this.username = username;
        this.image = image;
        this.title = title;
        this.serves = serves;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}
