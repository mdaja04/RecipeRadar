import React from 'react';
import './SignIn.css';

const SignIn = () => {
    return (
        <div className="page-container">
            <div className="outer-container">
                <div className="inner-header-container">
                    <h2>Welcome to Recipe Radar!</h2>
                    <h3>Sign in to your account</h3>
                </div>

                <div className="sign-in-container">
                    <label className="email-label">Email Address</label>
                    <input type="email" className="email-input" placeholder="Enter Email" required />

                    <label className="password-label">Password</label>
                    <input type="password" className="password-input" placeholder="Enter Password" required />


                    <button className="sign-in-button">Sign In</button>
                </div>

                <div className="or-container">
                    <span>Or continue with</span>
                    <button className="google-sign-in">Google</button>
                </div>
            </div>

        </div>
    );
};

export default SignIn;
