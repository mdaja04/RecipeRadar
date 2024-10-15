import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import FinalPageSignUp from './pages/FinalPageSignUp';
import HomePage from './pages/Home';
import Verify from "./pages/Verify";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/PrivateRoutes";
import PageNotFound from "./pages/PageNotFound";
import CreateRecipe from "./pages/CreateRecipe";
import MyRecipes from "./pages/MyRecipes";
import RecipeCardPage from "./pages/RecipeCardPage";
import Favourites from "./pages/Favourites";
import Settings from "./pages/Settings"
import EditRecipe from "./pages/EditRecipe";
import UserRecipes from "./pages/UserRecipes";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup-complete" element={<FinalPageSignUp />} />
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                <Route path="/create-recipe" element={<ProtectedRoute><CreateRecipe/></ProtectedRoute>}/>
                <Route path="/verify" element={<Verify/>} />
                <Route path="*" element={<PageNotFound/>} />
                <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
                <Route path="/recipe/edit/*" element={<ProtectedRoute><EditRecipe/></ProtectedRoute>}/>
                <Route path = "/:username" element={<ProtectedRoute><UserRecipes/></ProtectedRoute>}/>
                <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes/></ProtectedRoute>}/>
                <Route path="/recipe/*" element={<ProtectedRoute><RecipeCardPage/></ProtectedRoute>}/>
                <Route path="/favourites" element={<ProtectedRoute><Favourites/></ProtectedRoute>}/>

            </Routes>
        </Router>
    );
};

export default App;
