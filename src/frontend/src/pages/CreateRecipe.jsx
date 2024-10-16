import React, {useEffect, useState} from 'react';
import './CreateRecipe.css';
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";

const CreateRecipe = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [recipeTitle,setRecipeTitle] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");
    const [recipeImage, setRecipeImage] = useState(null);
    const [recipeServes, setRecipeServes] = useState(0);


    const addIngredient = () => {
        if (ingredient.trim()) {
            setIngredientsList([...ingredientsList, ingredient]);
            setIngredient("");
        }
    };

    const removeIngredient = (index) => {
        setIngredientsList(ingredientsList.filter((_, i) => i !== index));
    };


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

        if (!currentUsername) {
            alert("User not found. Please try again.");
            return;
        }
        //FormData is necessary to include images, plain JSON doesn't suffice
        const formData = new FormData();
        formData.append("username", currentUsername);
        formData.append("title", recipeTitle);
        formData.append("serves", recipeServes);
        formData.append("ingredients", JSON.stringify(ingredientsList));
        formData.append("instructions", recipeInstructions);

        if (recipeImage) {
            formData.append("image", recipeImage);
        }

        try {
            const response = await fetch("http://localhost:8080/recipes/create", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`  // Include the JWT in the Authorization header
                },
                body: formData,
            });

            if (response.ok) {
                alert('Recipe created successfully!');
                navigate('/my-recipes');
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
            setRecipeImage(file);
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
                            <input type="text" id="title" name="title" placeholder="Enter recipe title"
                                   onChange={(e) => setRecipeTitle(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="serves">Serves</label>
                            <input type="number" name="serves" placeholder="Enter number of people recipe serves"
                                   onChange={(e) => setRecipeServes(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Add Ingredients</label>
                            <input
                                type="text"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                placeholder="Enter ingredient"
                            />
                            <button type="button" onClick={addIngredient}>Add Ingredient</button>
                        </div>
                        <ul>
                            {ingredientsList.map((item, index) => (
                                <li key={index}>
                                    {item}
                                    <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>

                        <div className="form-group">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea id="instructions" name="instructions" placeholder="Enter instructions"
                                      onChange={(e) => setRecipeInstructions(e.target.value)} required/>
                        </div>
                        <button type="submit" className="submit-button" onClick={handleRecipeUpload}>Create Recipe
                        </button>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default CreateRecipe;
