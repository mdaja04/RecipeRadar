import React, {useEffect, useState} from 'react';
import Header from '../components/Header'
import './MyRecipes.css'
import {useNavigate} from "react-router-dom";

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch("http://localhost:8080/users/me", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,  // Include the JWT token in Authorization header
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUsername(userData.username); // Set the username if needed
                } else {
                    console.error("Failed to fetch username. Status:", response.status);
                    if (response.status === 401) {
                        alert("User is not authenticated. Redirecting to login.");
                        navigate("/signin");
                    }
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };




        fetchUsername();
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usernameResponse = await fetch("http://localhost:8080/users/me", {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                });
                if (!usernameResponse.ok) return navigate("/signin");

                const userData = await usernameResponse.json();
                setUsername(userData.username);

                const recipesResponse = await fetch(`http://localhost:8080/recipes/${userData.username}`, {
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

    function openRecipe() {
        console.log("Hi");
    }

    return (
        <div className="page-container">
            <Header/>
            <div className="recipes-grid">
                {recipes.toReversed().map(recipe => (
                    <div key={recipe.id} className="recipe-card" onClick={openRecipe}>
                        <img src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title}
                             className="recipe-image"/>
                        <div className="recipe-info">
                            <h2>{recipe.title}</h2>
                            <p>Serves: {recipe.serves}</p>
                            <p>Ingredients: {recipe.ingredients}</p>
                            <p>Instructions: {recipe.instructions}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default MyRecipes;
