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
    const [username, setUsername] = useState("");


    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch("http://localhost:8080/users/my-username", {
                    method: 'GET',
                    credentials: 'include', // Include credentials such as cookies in the request
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username); // Set the username state from the response
                } else if (response.status === 401) {
                    alert("User is not authenticated. Please log in.");
                    navigate("/signin");
                } else {
                    console.error("Failed to fetch username.");
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };

        fetchUsername();
    }, [navigate]);

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

    const handleRecipeUpload = async (e) => {
        e.preventDefault();

        if (!username) {
            alert("Unable to retrieve user details. Please log in again.");
            return;
        }

        const recipe = {
            title: recipeTitle,
            serves: parseInt(recipeServes, 10),
            ingredients: recipeIngredients,
            instructions: recipeInstructions,
            imageUrl: imagePreview,
        };

        try {
            const response = await fetch(`http://localhost:8080/recipes/create/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include", // Include cookies in the request
                body: JSON.stringify(recipe),
            });

            if (response.ok) {
                alert('Upload completed successfully');
                setRecipeTitle('');
                setRecipeServes(0);
                setRecipeIngredients('');
                setRecipeInstructions('');
                setImagePreview(null);
                navigate("/home");
            } else {
                alert('Failed to create recipe');
            }
        } catch (error) {
            console.error('Error creating recipe:', error);
            alert('An error occurred while creating the recipe.');
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
