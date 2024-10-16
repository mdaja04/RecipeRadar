import React, {useEffect, useState} from 'react';
import './EditRecipe.css';
import Header from "../components/Header";
import {useLocation, useNavigate} from "react-router-dom";

const EditRecipe = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { recipeId } = location.state || {};
    const [imagePreview, setImagePreview] = useState(null);
    const [recipeTitle,setRecipeTitle] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState("");
    const [recipeServes, setRecipeServes] = useState(0);
    const [recipeInstructions, setRecipeInstructions] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");
    const [recipeImage, setRecipeImage] = useState(null);


    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch("https://reciperadar-e0s5.onrender.com/users/me", {
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
        formData.append("ingredients", recipeIngredients);
        formData.append("instructions", recipeInstructions);

        if (recipeImage) {
            formData.append("image", recipeImage);
        }

        try {
            const response = await fetch("https://reciperadar-e0s5.onrender.com/recipes/edit", {
                method: 'PUT',
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


    const deleteRecipe = async() => {
        const confirmed = window.confirm("Are you sure you want to delete your recipe?");
        if (confirmed) {
            try {
                const response = await fetch(`https://reciperadar-e0s5.onrender.com/recipes/delete/${recipeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                if (response.ok) {
                    alert("Recipe Deleted Successfully!");
                    navigate("/my-recipes");
                } else {
                    alert("failed to delete recipe!")
                }


            } catch (error) {
                console.error("Error deleting recipe:", error);
                alert("An error occurred while deleting recipe.");

            }
        }


    }

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
                    <h2>Edit Recipe</h2>
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
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea id="ingredients" name="ingredients" placeholder="Enter ingredients"
                                      onChange={(e) => setRecipeIngredients(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea id="instructions" name="instructions" placeholder="Enter instructions"
                                      onChange={(e) => setRecipeInstructions(e.target.value)} required/>
                        </div>

                    </form>
                    <button type="submit" className="submit-button" onClick={handleRecipeUpload}>Confirm Changes
                    </button>
                    <button type="submit" className="submit-button" id="delete-button" onClick={deleteRecipe}>Delete Recipe</button>



            </div>

            </div>

        </div>
    );
};

export default EditRecipe;
