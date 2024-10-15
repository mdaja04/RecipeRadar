import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import './SearchBar.css';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery) {
            navigate(`/home?search=${searchQuery}`);
        }
    };

    return (
        <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSearch();
                }
            }}
        />
    );
};

export default SearchBar;
