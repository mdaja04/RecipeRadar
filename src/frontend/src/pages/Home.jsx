import React, {useEffect, useState} from 'react';
import Header from '../components/Header'
import {useNavigate} from "react-router-dom";
import './Home.css'
const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRandomRecipes();
    }, []);

    const search = async (query) => {
        try {
            const response = await fetch(`http://localhost:8080/recipes/search?searchQuery=${query}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error("Error searching recipes:", error);
        }
    };

    const fetchRandomRecipes = async () => {
        try {
            const response = await fetch(`http://localhost:8080/recipes/random?limit=10`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            const newRecipes = await response.json();
            const uniqueNewRecipes = newRecipes.filter(
                (newRecipe) => !recipes.some((existingRecipe) => existingRecipe.id === newRecipe.id)
            );


            setRecipes([...recipes, ...uniqueNewRecipes]);        } catch (error) {
            console.error("Error fetching random recipes:", error);
        }
    };

    const openRecipe = (recipe) => {
        navigate(`/recipe/${recipe.id}`, { state: { recipe } });
    };


    return (
        <div className="page-container">
            <Header onSearch={search} />
            <div className="recipes-grid">
                {recipes.length === 0 ? (
                    <p>Loading recipes...</p>
                ) : (
                    recipes.toReversed().map((recipe) => (
                        <div key={recipe.id} className="recipe-card" onClick={() => openRecipe(recipe)}>
                            <img src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} className="recipe-image" />
                            <div className="recipe-info">
                                <div className="title-text">{recipe.title}</div>
                                <div className="serves-text">Serves: {recipe.serves}</div>
                            </div>
                        </div>
                    ))
                )}

            </div>
            <button className="show-more-button" onClick={fetchRandomRecipes}>Show More</button>
        </div>
    );
};

export default Home;
