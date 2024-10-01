import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let cookie of cookieArray) {
        cookie = cookie.trim();
        if (cookie.startsWith(name)) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
};

const isAuthenticated = () => {
    const token = getCookie("token");
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp > Date.now() / 1000;
    } catch {
        return false;
    }
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
