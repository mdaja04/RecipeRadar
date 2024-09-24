import React from 'react';
import './FinalPageSignUp.css'
import RecipeRadarLogo from "../components/RecipeRadarLogo.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FinalPageSignUp = () => {

    return (
        <div className="page-container">
            <div className="outer-container">
                <div className="inner-header-container">
                    <RecipeRadarLogo/>
                    <h2>Welcome to Recipe Radar!</h2>
                    <h3>Complete your sign-up</h3>
                </div>
                <div className="sign-up-container">
                    <label className="name-label">Name</label>
                    <input type="text" className="email-input" placeholder="Enter Name" required/>
                    <label className="surname-label">Surname</label>
                    <input type="text" className="surname-input" placeholder="Enter Surname" required/>
                    <label className="username-label">Username</label>
                    <input type="text" className="username-input" placeholder="Enter Username" required/>
                    <button className="complete-button">Complete</button>
                </div>
            </div>
        </div>

    );
};

export default FinalPageSignUp;
