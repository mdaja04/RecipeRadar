package com.example.reciperadar.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AddItemsDto {
    private String username;
    private List<String> items;
}
