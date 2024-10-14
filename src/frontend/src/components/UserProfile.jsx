import React, {useEffect, useState} from 'react';
import './UserProfile.css'
import {useNavigate} from "react-router-dom";


const UserProfile = () => {
    const navigate = useNavigate()
    const[profileImage, setProfileImage] = useState();


    useEffect(() => {
        const cachedImage = localStorage.getItem("profileImage");
        if (cachedImage) {
            setProfileImage(cachedImage);
        } else {
            fetchData();
        }
    }, [navigate]);



    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/users/me", {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            });

            const userData = await response.json();
            setProfileImage(userData.image);
            localStorage.setItem("profileImage", userData.image); // Cache the image


        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }





    function openRecipesPage(){
        navigate('/settings');
    }


    return (
        <button className="user-profile-container" onClick={openRecipesPage}>
            {profileImage ? (
                <img className="profile-image" src={`data:image/jpeg;base64,${profileImage}`} alt="pfp" />
            ) : (
                <div className="placeholder">Profile</div>
            )}


        </button>

    );
};

export default UserProfile;
