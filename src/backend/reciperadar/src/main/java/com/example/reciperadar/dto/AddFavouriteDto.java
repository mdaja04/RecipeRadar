package com.example.reciperadar.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddFavouriteDto {
    private String username;
    private Long recipeId;

}
