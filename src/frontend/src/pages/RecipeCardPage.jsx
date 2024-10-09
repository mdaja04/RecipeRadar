import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RecipeCardPage.css';
import Header from "../components/Header";
import FavouriteButton from "../components/FavouriteButton";

const RecipeCardPage = () => {
    const { state } = useLocation();
    const { recipe } = state || {}; // retrieve email and password from state


    return (
        <div className="page-container">
            <Header/>
            <div className="inner-container">
                <div className="photo-container">
                    <img className="recipe-image" src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} />
                </div>
                <div className="recipe-details-container">
                    <div className="recipe-details-header">
                        <FavouriteButton/>
                    </div>
                    <h1>{recipe.title}</h1>
                    <h2>Serves: {recipe.serves}</h2>
                    <p className="recipe-text">{recipe.ingredients}</p>
                    <p className="recipe-text">{recipe.instructions}</p>

                </div>
            </div>
        </div>
    );
};

export default RecipeCardPage;