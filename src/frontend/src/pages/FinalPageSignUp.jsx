import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FinalPageSignUp.css';
import RecipeRadarLogo from "../components/RecipeRadarLogo.jsx";

const FinalPageSignUp = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { email, password } = state || {}; // retrieve email and password from state

    // Local state for the additional user information
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');

    // Handle form submission
    const handleCompleteSignUp = async () => {
        // Prepare the user object
        const userData = {
            email,
            password,
            //name,
            //surname,
            username
        };
        try {
            console.log(userData);
            // Send registration data to the backend
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Registration successful
                alert('Registration completed successfully');
                navigate('/verify'); // Redirect to login page
            } else {
                // Registration failed
                const errorData = await response.json();
                alert('Registration failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration.');
        }
    };

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
                    <input
                        type="text"
                        className="name-input"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label className="surname-label">Surname</label>
                    <input
                        type="text"
                        className="surname-input"
                        placeholder="Enter Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                    <label className="username-label">Username</label>
                    <input
                        type="text"
                        className="username-input"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <button className="complete-button" onClick={handleCompleteSignUp}>
                        Complete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinalPageSignUp;
