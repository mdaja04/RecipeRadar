import React from 'react';
import './UserProfile.css'
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate()

    function openRecipesPage(){
        navigate('/my-recipes');
    }


    return (
        <button className="user-profile-container" onClick={openRecipesPage}>
            <div className="user-profile">
            </div>
        </button>

    );
};

export default UserProfile;
