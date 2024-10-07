package com.example.reciperadar.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeDto {
    private String username;
    private String title;
    private Integer serves;

    private String ingredients;

    private String instructions;

    public RecipeDto(String username, String title, Integer serves, String ingredients, String instructions) {
        this.username = username;
        this.title = title;
        this.serves = serves;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}
