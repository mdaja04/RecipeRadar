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
                        <li><p>Favourites</p></li>
                        <li><p>Shopping List</p></li>
                        <li><p>Logout</p></li>
                    </ul>
                </div>
            )}
        </div>


    );
}

export default MoreOptions;
