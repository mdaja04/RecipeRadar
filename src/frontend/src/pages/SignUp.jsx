import React, { useState } from 'react';
import './SignUp.css';
import RecipeRadarLogo from "../components/RecipeRadarLogo.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        if (password !== reEnteredPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Navigate to the next page with the password and email
        navigate('/signup-complete', {
            state: { email, password },  // Passing email and password through state
        });
    };

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
                    <input
                        type="email"
                        className="email-input"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="password-label">Password</label>
                    <input
                        type="password"
                        className="password-input"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className="password-label">Re-enter Password</label>
                    <input
                        type="password"
                        className="re-enter-password-input"
                        placeholder="Re-enter Password"
                        value={reEnteredPassword}
                        onChange={(e) => setReEnteredPassword(e.target.value)}
                        required
                    />
                    <button className="continue-button" onClick={handleNext}>Continue</button>
                </div>
                <div className="or-container">
                    <span>Or continue with</span>
                    <Link to="/login">
                        <button className="google-sign-in">
                            <FontAwesomeIcon icon={faGoogle}/>
                            Google
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
