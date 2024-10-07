import React, {useEffect, useState} from 'react';
import './CreateRecipe.css';
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";

const CreateRecipe = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [recipeTitle,setRecipeTitle] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState("");
    const [recipeServes, setRecipeServes] = useState(0);
    const [recipeInstructions, setRecipeInstructions] = useState("");
    const [currentUsername, setCurrentUsername] = useState(""); // Store the username if needed


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
                    setCurrentUsername(userData.username); // Set the username if needed
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

    const handleRecipeUpload = async (e) => {
        e.preventDefault();

        // Ensure user ID is available before creating the recipe
        if (!currentUsername) {
            alert("User not found. Please try again.");
            return;
        }

        // Construct the recipe object with user ID details
        const recipeData = {
            username: currentUsername,
            title: recipeTitle,
            serves: recipeServes,
            ingredients: recipeIngredients,
            instructions: recipeInstructions,
        };

        try {
            // Make the request to the backend to create the recipe
            const response = await fetch("http://localhost:8080/recipes/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`  // Include the JWT in the Authorization header
                },
                body: JSON.stringify(recipeData),
            });

            if (response.ok) {
                alert('Recipe created successfully!');
                navigate('/recipes');  // Redirect to the recipes page after successful creation
            } else {
                alert('Failed to create the recipe.');
            }
        } catch (error) {
            console.error("Error creating recipe:", error);
            alert("An error occurred while creating the recipe.");
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <div className="page-container">
            <Header/>
            <div className="inner-container">
                <div className="photo-container">
                    <label htmlFor="image-upload" className="image-upload-label">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Selected Recipe" className="image-preview"/>
                        ) : (
                            <div className="placeholder-text">Click to Select Photo</div>
                        )}
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        style={{display: 'none'}}
                        onChange={handleImageChange}
                    />
                </div>

                <div className="recipe-details-container">
                    <h2>Create New Recipe</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Recipe Title</label>
                            <input type="text" id="title" name="title" placeholder="Enter recipe title" onChange={(e) => setRecipeTitle(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="serves">Serves</label>
                            <input type="number" name="serves" placeholder="Enter number of people recipe serves" onChange={(e) => setRecipeServes(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea id="ingredients" name="ingredients" placeholder="Enter ingredients" onChange={(e) => setRecipeIngredients(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea id="instructions" name="instructions" placeholder="Enter instructions" onChange={(e) => setRecipeInstructions(e.target.value)} required/>
                        </div>
                        <button type="submit" className="submit-button" onClick={handleRecipeUpload}>Create Recipe</button>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default CreateRecipe;
