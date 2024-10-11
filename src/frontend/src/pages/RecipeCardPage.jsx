import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RecipeCardPage.css';
import Header from "../components/Header";
import FavouriteButton from "../components/FavouriteButton";

const RecipeCardPage = () => {
    const { state } = useLocation();
    const { recipe} = state || {};
    const [username, setUsername] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const usernameResponse = await fetch("http://localhost:8080/users/me", {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                });
                //if (!usernameResponse.ok) return navigate("/signin");

                const userData = await usernameResponse.json();
                setUsername(userData.username);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [navigate]);


    return (
        <div className="page-container">
            <Header/>
            <div className="inner-container">
                <div className="photo-container">
                    <img className="recipe-image" src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} />
                </div>
                <div className="recipe-details-container">
                    <div className="recipe-details-header">
                        <FavouriteButton recipeId = {recipe.id} username = {username}/>
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