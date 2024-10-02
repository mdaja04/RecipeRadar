import React, { useState } from 'react';
import './CreateRecipe.css';
import Header from "../components/Header";

const CreateRecipe = () => {
    const [imagePreview, setImagePreview] = useState(null);

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

    const handleRecipeUpload = () => {

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
                    {/* Hidden File Input */}
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
                            <input type="text" id="title" name="title" placeholder="Enter recipe title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="serves">Serves</label>
                            <input type="number" name="serves" placeholder="Enter number of people recipe serves"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea id="ingredients" name="ingredients" placeholder="Enter ingredients"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea id="instructions" name="instructions" placeholder="Enter instructions"/>
                        </div>
                        <button type="submit" className="submit-button" onClick={handleRecipeUpload}>Create Recipe</button>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default CreateRecipe;
