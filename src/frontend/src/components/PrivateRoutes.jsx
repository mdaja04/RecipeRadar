import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const isAuthenticated = () => {
    const token = getCookie("token");
    if (!token) return false;

    try {
        // Decode and check if the token is expired
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (e) {
        return false;
    }
};

const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
