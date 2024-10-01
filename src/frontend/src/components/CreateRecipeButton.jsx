import React from 'react';
import './CreateRecipeButton.css'
import {useNavigate} from "react-router-dom";
const CreateRecipeButton = () => {
    const navigate = useNavigate();

    function openHome() {
        navigate('/create-recipe');
    }

    return (
        <button className="create-recipe-button-container" onClick={openHome}>
            Create Recipe
        </button>


    );
};

export default CreateRecipeButton;
