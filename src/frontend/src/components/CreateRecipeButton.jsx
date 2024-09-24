import React from 'react';
import './CreateRecipeButton.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const CreateRecipeButton = () => {
    return (

        <Link to="/create-recipe">
            <div className="create-recipe-button-container">
                <div className="create-recipe-button">
                    Create
                </div>
            </div>
        </Link>
    );
};

export default CreateRecipeButton;
