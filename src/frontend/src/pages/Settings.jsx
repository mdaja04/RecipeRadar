import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import './Settings.css'


const Settings = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const[surname, setSurname] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const[currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch("https://reciperadar-e0s5.onrender.com/users/me", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setCurrentUsername(userData.username);
                } else {
                    console.error("Failed to fetch username. Status:", response.status);
                    if (response.status === 401) {
                        alert("User is not authenticated. Redirecting to login.");
                        navigate("/signin");
                    }
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };
        fetchUsername();
    }, [navigate]);



    const handleSaveSettings = async () => {
        const formData = new FormData();
        formData.append("username", currentUsername);
        if (profilePicture) {
            formData.append("image", profilePicture);
            localStorage.removeItem("token");
        }
        if (name !== ""){
            formData.append("name", name);
        }
        if (surname !== ""){
            formData.append("surname", surname);
        }

        formData.append("publicProfile", isPrivate);

        try{
            const response = await fetch("https://reciperadar-e0s5.onrender.com/users/update", {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,

            })

            if (response.ok) {
                alert("Profile updated successfully!");
                navigate('/home');
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating profile.");
        }




    }


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const deleteAccount = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
        if (confirmed){
            try{
                const response = await fetch(`https://reciperadar-e0s5.onrender.com/users/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: currentUsername }),

                })
                if (response.ok){
                    alert("Account Deleted Successfully!");
                    localStorage.clear();
                    navigate("/signup");
                }
                else{
                    alert("failed to delete account!")
                }


            }
            catch (error) {
                console.error("Error deleting user:", error);
                alert("An error occurred while deleting user.");

            }
        }




    }

    return (
        <div className="page-container">
            <Header/>
            <div className="inner-container">
                <div className="photo-container">
                    <label htmlFor="image-upload" className="image-upload-label">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Selected Recipe" className="image-preview"/>
                        ) : (
                                <div className="placeholder-text">Change Profile Picture By Selecting Here</div>

                            )
                        }

                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        style={{display: 'none'}}
                        onChange={handleImageChange}
                    />
                </div>

                <div className="recipe-details-container">
                    <div className="recipe-details-container-inner-upper">
                        <h2>Change Profile Details</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Change Name</label>
                                <input type="text" name="surname" placeholder="Enter name here"
                                       onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Change Surname</label>
                                <input type="text" name="surname" placeholder="Enter surname here"
                                       onChange={(e) => setSurname(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Set Account Privacy</label>
                                <div className="privacy-toggle">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={isPrivate}
                                            onChange={() => setIsPrivate(!isPrivate)}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                    <label>{isPrivate ? "Private" : "Public"}</label>
                                </div>
                            </div>
                        </form>
                        <button type="submit" className="submit-button" onClick={handleSaveSettings}>Save Changes
                        </button>

                    </div>
                    <div className="delete-button-container">
                        <button type="submit" className="submit-button" id="delete-button"
                                onClick={deleteAccount}>Delete Account
                        </button>
                    </div>


                </div>
            </div>
        </div>

    );
};

export default Settings;
