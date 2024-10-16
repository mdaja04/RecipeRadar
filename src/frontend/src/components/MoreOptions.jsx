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
        localStorage.clear();
        alert("Logged out successfully");
        navigate('/signin');
    };

    const openFavourites = () => {
        navigate('/favourites')
    }


    function openMyRecipes() {
        navigate('/my-recipes')
    }

    function openShoppingList(){
        navigate('/shopping-list')
    }

    return (
        <div className="dropdown-container">
            <button className="more-options-container" onClick={toggleDropdown}>
                <span className="material-symbols-outlined"> keyboard_arrow_down</span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li onClick={openMyRecipes}><label>My Recipes</label></li>
                        <li onClick={openFavourites}><label>Favourites</label></li>
                        <li onClick={openShoppingList}><label>Shopping List</label></li>
                        <li onClick={logOut}><label>Logout</label></li>
                    </ul>
                </div>
            )}
        </div>


    );
}

export default MoreOptions;
