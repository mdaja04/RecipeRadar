import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Correct import

// Function to check if the user is authenticated
const isAuthenticated = () => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        // Decode the token to check its expiration
        const decodedToken = jwtDecode(token);
        return decodedToken.exp > Date.now() / 1000;  // Return true if the token is still valid
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        return false;  // If decoding fails, treat it as not authenticated
    }
};

// Component to protect routes
const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
