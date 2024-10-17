import React from 'react';
import './FavouriteButton.css'
import {json, useNavigate} from "react-router-dom";
const FavouriteButton = ({recipeId, username}) => {
    const navigate = useNavigate();

    const addToFavourites = async () => {
        try{

            const data = {
                username,
                recipeId
            }

            const response = await fetch("https://reciperadar-e0s5.onrender.com/favourites/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`  // Include the JWT in the Authorization header
                },
                body: JSON.stringify(data),

            }
            )
            if(response.ok){
                alert('Recipe added to favourites!');
            }
            else {
                alert('Failed to favourite the recipe.');
            }

        }catch{
            console.error("Error adding recipe to favourites:");
            alert("An error occurred while adding recipe to favourites.");
        }

    }

    return (
        <button className="favourite-btn" onClick={addToFavourites}>Favourite</button>


    );
};

export default FavouriteButton;
