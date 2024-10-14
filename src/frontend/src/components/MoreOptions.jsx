import './MoreOptions.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function MoreOptions() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logOut = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully");
        navigate('/signin');
    };

    const openFavourites = () => {
        navigate('/favourites')
    }


    function openMyRecipes() {
        navigate('/my-recipes')
    }

    return (
        <div className="dropdown-container">
            <button className="more-options-container" onClick={toggleDropdown}>
                <span className="material-symbols-outlined"> keyboard_arrow_down</span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li><button onClick={openMyRecipes}>My Recipes</button></li>
                        <li><button onClick={openFavourites}>Favourites</button></li>
                        <li><button>Shopping List</button></li>
                        <li><button onClick={logOut}>Logout</button></li>
                    </ul>
                </div>
            )}
        </div>


    );
}

export default MoreOptions;
