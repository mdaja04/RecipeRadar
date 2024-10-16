import React, {useEffect, useState} from 'react';
import Header from '../components/Header'
import './MyRecipes.css'
import {useNavigate} from "react-router-dom";

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [recipeId, setRecipeId] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const usernameResponse = await fetch("https://reciperadar-e0s5.onrender.com/users/me", {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                });
                //if (!usernameResponse.ok) return navigate("/signin");

                const userData = await usernameResponse.json();
                setUsername(userData.username);

                const recipesResponse = await fetch(`https://reciperadar-e0s5.onrender.com/recipes/${userData.username}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                });
                const recipesData = await recipesResponse.json();
                setRecipes(recipesData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [navigate]);

    function openRecipe(recipe) {
        const recipeId = recipe.id;
        navigate(`/recipe/${recipeId}`, { state: { recipe} });
    }


    function editRecipe(recipe) {
        const recipeId = recipe.id;
        navigate(`/recipe/edit/${recipeId}`, { state: { recipeId } });
    }


    return (
        <div className="page-container">
            <Header/>
            <div className="recipes-grid">
                {recipes.toReversed().map(recipe => (
                    <div key={recipe.id} className="recipe-card">
                        <img src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title}
                             className="recipe-image" onClick={() => openRecipe(recipe)}/>
                        <div className="recipe-info">
                        <div className="title-text">{recipe.title}</div>
                        <div className="serves-text">Serves: {recipe.serves}</div>
                            <button id="edit-button" onClick={() => editRecipe(recipe)}><span className="material-symbols-outlined">edit</span></button>
                        </div>
                    </div>

                ))}
            </div>
        </div>

    );
};

export default MyRecipes;
