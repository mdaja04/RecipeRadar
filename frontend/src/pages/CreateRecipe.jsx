import Header from "../components/Header.jsx";
import UploadRecipeImage from "../components/UploadRecipeImage.jsx";
import React from "react";
import "./CreateRecipe.css"


function CreateRecipe() {
    return (
            <div>
                <Header></Header>
                <div className="title-create-recipe">
                    Create Recipe
                </div>
                <div className="outer-container">
                    <div className="left-side-inner-container" >
                        <UploadRecipeImage></UploadRecipeImage>
                    </div>
                    <div className="right-side-inner-container">
                        <label className="title-label">Title</label>
                        <input className="title-input" placeholder="Enter Title"/>
                        <label className="description-label">Description</label>
                        <textarea className="description-input" placeholder="Enter Description"/>
                        <button className="submit-btn">Create</button>
                    </div>
                </div>
            </div>

    );
}

export default CreateRecipe;
