import React from 'react';
import './CreateRecipeButton.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const CreateRecipeButton = () => {
    return (

        <button className="create-recipe-button-container">
            <div className="create-recipe-button">
                Create
            </div>
        </button>
    );
};

export default CreateRecipeButton;
