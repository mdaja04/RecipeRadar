import React from 'react';
import './FavouriteButton.css'
import {useNavigate} from "react-router-dom";
const FavouriteButton = () => {
    const navigate = useNavigate();

    function openHome() {
        navigate('/favourites');
    }

    return (
        <button className="favourite-btn" onClick={openHome}>Favourite</button>


    );
};

export default FavouriteButton;
