import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import FinalPageSignUp from './pages/FinalPageSignUp';
import HomePage from './pages/Home';
import Verify from "./pages/Verify";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/PrivateRoutes";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp />} />  {/* Corrected the path */}
                <Route path="/signup-complete" element={<FinalPageSignUp />} />
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>

                <Route path="/verify" element={<Verify/>} /> {/* Verify route */}
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;
