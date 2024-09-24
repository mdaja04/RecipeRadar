import './MoreOptions.css'
import {useState} from "react";


function MoreOptions() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="dropdown-container">
            <button className="more-options-container" onClick={toggleDropdown}>
                <span className="material-symbols-outlined"> keyboard_arrow_down</span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li><a>Favourites</a></li>
                        <li><a>Shopping List</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            )}
        </div>


    );
}

export default MoreOptions;
