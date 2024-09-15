import React from 'react';
import './SignUp.css'
import RecipeRadarLogo from "../components/RecipeRadarLogo.jsx";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


const SignUp = () => {

    return (
        <div className="page-container">
            <div className="outer-container">
                <div className="inner-header-container">
                    <RecipeRadarLogo/>
                    <h2>Welcome to Recipe Radar!</h2>
                    <h3>Create your account</h3>
                </div>
                <div className="sign-up-container">
                    <label className="email-label">Email Address</label>
                    <input type="email" className="email-input" placeholder="Enter Email" required/>
                    <label className="password-label">Password</label>
                    <input type="password" className="password-input" placeholder="Enter Password" required/>
                    <label className="password-label">Re-enter Password</label>
                    <input type="password" className="re-enter-password-input" placeholder="Re-enter Password" required/>

                    <button className="continue-button">Continue</button>
                </div>
                <div className="or-container">
                    <span>Or continue with</span>
                    <button className="google-sign-in">
                        <FontAwesomeIcon icon={faGoogle}/>
                        Google
                    </button>
                </div>

            </div>

        </div>

    );
};

export default SignUp;
