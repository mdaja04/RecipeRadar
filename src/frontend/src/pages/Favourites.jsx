import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
const Favourites = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [username, setUsername] = useState("");
    const [recipeIds, setRecipeIds] = useState([]);

    useEffect(() => {
        const getFavouriteRecipes = async () => {
            try {
                const usernameResponse = await fetch("http://localhost:8080/users/me", {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                });

                if (!usernameResponse.ok) throw new Error("Failed to fetch username");

                const userData = await usernameResponse.json();
                setUsername(userData.username);

                const favouriteIdsResponse = await fetch(`http://localhost:8080/favourites/${userData.username}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                });

                if (!favouriteIdsResponse.ok) throw new Error("Failed to fetch favourite IDs");

                const favouriteIds = await favouriteIdsResponse.json();
                setRecipeIds(favouriteIds);
            } catch (error) {
                console.error("Error fetching favourite recipes:", error);
            }
        };
        getFavouriteRecipes();
    }, [navigate]);

    // Fetch recipes whenever `recipeIds` is updated
    useEffect(() => {
        const fetchFavouriteRecipes = async () => {
            if (recipeIds && recipeIds.length > 0) {
                try {
                    const favouriteRecipesResponse = await fetch("http://localhost:8080/recipes/favourites", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(recipeIds),
                    });

                    if (!favouriteRecipesResponse.ok) throw new Error("Failed to fetch favourite recipes");

                    const recipesData = await favouriteRecipesResponse.json();
                    setRecipes(recipesData);
                } catch (error) {
                    console.error("Error fetching favourite recipes:", error);
                }
            }
        };
        fetchFavouriteRecipes();
    }, [recipeIds]); // Run only when `recipeIds` changes

    function openRecipe(recipe) {
        const recipeId = recipe.id;
        navigate(`/recipe/${recipeId}`, { state: { recipe } });
    }
    return (
        <div className="page-container">
            <Header/>
            <div className="recipes-grid">
                {recipes.toReversed().map(recipe => (
                    <div key={recipe.id} className="recipe-card" onClick={() => openRecipe(recipe)}>
                        <img src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title}
                             className="recipe-image"/>
                        <div className="recipe-info">
                            <div className="title-text">{recipe.title}</div>
                            <div className="serves-text">Serves: {recipe.serves}</div>
                        </div>
                    </div>

                ))}
            </div>
        </div>

    );
};

export default Favourites;
