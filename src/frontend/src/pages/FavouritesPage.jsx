import React from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
const FavouritesPage = () => {
    const navigate = useNavigate();



    return (
        <div className="page-container">
            <Header/>
        </div>

    );
};

export default FavouritesPage;
