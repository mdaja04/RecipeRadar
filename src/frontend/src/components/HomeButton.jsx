import React from 'react';
import './HomeButton.css'
import {useNavigate} from "react-router-dom";

const HomeButton = () => {
    const navigate = useNavigate();

    function openHome() {
        navigate('/home');
    }

    return (
        <button className="home-button-container" onClick={openHome}>
            <div className="home-button">
                <span className="material-symbols-outlined">skillet</span>
                </div>
        </button>

    );
};

export default HomeButton;
