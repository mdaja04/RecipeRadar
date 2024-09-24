import React from 'react';
import './SignIn.css'
import RecipeRadarLogo from "../components/RecipeRadarLogo.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignIn = () => {

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
                    <input type="email" className="email-input" placeholder="Enter Email" required/>
                    <label className="password-label">Password</label>
                    <input type="password" className="password-input" placeholder="Enter Password" required/>
                    <label className="forgot-password">Forgot Password?</label>
                    <button className="sign-in-button">Log in</button>
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
