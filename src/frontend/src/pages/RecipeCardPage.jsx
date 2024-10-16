import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RecipeCardPage.css';
import Header from "../components/Header";
import FavouriteButton from "../components/FavouriteButton";
import UserProfile from "../components/UserProfile";

const RecipeCardPage = () => {
    const { state } = useLocation();
    const { recipe} = state || {};
    const [myUsername, setMyUsername] = useState("");
    const [username, setUsername] = useState("");
    const ingredients = JSON.parse(recipe.ingredients);

    const[user, setUser] = useState(null);
    const navigate = useNavigate();
    const[profileImage, setProfileImage] = useState();



    useEffect(() => {

        const fetchRecipeUserData = async () => {
            try{
                const response = await fetch(`http://localhost:8080/users/${recipe.username}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                });
                const userData = await response.json();
                setUser(userData);
                setUsername(userData.username);
                setProfileImage(userData.image);

            }catch{}


        }
        const fetchData = async () => {
            try {
                const usernameResponse = await fetch(`http://localhost:8080/users/me`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                });

                const userData = await usernameResponse.json();
                setMyUsername(userData.username);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchRecipeUserData();
        fetchData();
    }, [navigate]);


    function openRecipesPage() {
        navigate(`/${username}`, {state: {user}});
    }

    function addToShoppingList() {
        return undefined;
    }

    return (
        <div className="page-container">
            <Header/>
            <div className="inner-container">
                <div className="photo-container">
                    <img className="recipe-image" src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} />
                </div>
                <div className="recipe-details-container">
                    <div className="recipe-details-header">
                        <button className="user-profile-container" onClick={openRecipesPage}>
                            {profileImage ? (
                                <img className="profile-image" src={`data:image/jpeg;base64,${profileImage}`}
                                     alt="pfp"/>
                            ) : (
                                <div className="placeholder">Profile</div>
                            )}

                        </button>
                        <FavouriteButton recipeId={recipe.id} username={myUsername}/>
                    </div>
                    <h1>{recipe.title}</h1>
                    <h2>Serves: {recipe.serves}</h2>
                    <h3>Ingredients:</h3>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <button className="submit-button" onClick={addToShoppingList()}>Add to Shopping List</button>
                    <p className="recipe-text">{recipe.instructions}</p>

                </div>
            </div>
        </div>
    );
};

export default RecipeCardPage;