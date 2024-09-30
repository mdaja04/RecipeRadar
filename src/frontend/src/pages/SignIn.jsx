import React, {useState} from 'react';
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
            console.log(userData);
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('Sign in completed successfully');
                navigate('/home');
            }
            else {
                const errorData = await response.json();
                alert('Sign in failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            alert('An error occurred during sign in.');
        }
    };


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
            <label className="sign-up-label">Sign up here</label>
        </div>

    );
};

export default SignIn;
