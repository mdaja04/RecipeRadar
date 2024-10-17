import React, {useEffect, useState} from 'react';
import './SignIn.css'
import RecipeRadarLogo from "../components/RecipeRadarLogo.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    const handleSignIn = async () => {
        const userData = {
            email,
            password,
        };

        try {
            const response = await fetch('https://reciperadar-e0s5.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const responseData = await response.json();

                if (responseData.verified) {
                    alert('Sign in completed successfully!');
                    localStorage.setItem("token", responseData.token);
                    navigate('/home');
                } else {
                    alert('Account not verified. Please verify your account.');
                    navigate('/verify');
                }
            } else {
                alert('Sign in failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            alert('An error occurred during sign in.');
        }
    };


    function openSignupPage() {
        navigate('/signup')
    }

    return (
        <div className="page-container">
            <div className="outer-container">
                <div className="inner-header-container">
                    <RecipeRadarLogo/>
                    <h2>Welcome to Recipe Radar!</h2>
                    <h3>Log in to your account</h3>
                </div>
                <div className="sign-in-container">
                    <label className="email-label">Email Address</label>
                    <input type="email"
                           className="email-input"
                           placeholder="Enter Email" required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <label className="password-label">Password</label>
                    <input type="password"
                           className="password-input"
                           placeholder="Enter Password"
                           required value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="forgot-password">Forgot Password?</label>
                    <button className="sign-in-button" onClick={handleSignIn}>
                        Sign In
                    </button>
                </div>
                <div className="or-container">
                    <span>Or continue with</span>
                    <button className="google-sign-in">
                        <div className="font-awesome-google">
                            <FontAwesomeIcon icon={faGoogle}/>
                        </div>
                        Google
                    </button>
                </div>

            </div>
            <p>Don't have an account?</p>
            <label className="sign-up-label" onClick={openSignupPage}>Sign up here</label>
        </div>

    );
};

export default SignIn;
