import React, { useState } from 'react';
import RecipeRadarLogo from "../components/RecipeRadarLogo";
import {useLocation, useNavigate} from 'react-router-dom'; // Import useNavigate for navigation
import './Verify.css'

const Verify = () => {
    const { state } = useLocation();
    const { email } = state || {}; // retrieve email and password from state
    const [verificationCode, setVerificationCode] = useState('');

    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    const handleVerify = async () => {
        try {
            const userData = {
                email,
                verificationCode
            }
            console.log(userData);

            // Send registration data to the backend
            const response = await fetch('http://localhost:8080/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Registration successful
                alert('Verification completed successfully');
                navigate('/home'); // Redirect to login page
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
                    <h3>Verify your account</h3>
                </div>
                <div className="verify-container">
                    <label className="verification-code-label">Enter Verification Code</label>
                    <input
                        type="text"
                        className="name-input"
                        placeholder="Enter Verification Code"
                        value={verificationCode} // Link to state variable
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                    />
                    <button className="complete-button" onClick={handleVerify}>
                        Complete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Verify;
