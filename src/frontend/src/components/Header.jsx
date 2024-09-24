import React from 'react';
import HomeButton from "./HomeButton.jsx";
import CreateRecipeButton from "./CreateRecipeButton.jsx";
import SearchBar from "./SearchBar.jsx";
import UserProfile from "./UserProfile";
import MoreOptions from "./MoreOptions.jsx";
import './Header.css'
const Header = () => {
    return (
        <div className="header-container">
            <HomeButton></HomeButton>
            <CreateRecipeButton></CreateRecipeButton>
            <SearchBar></SearchBar>
            <UserProfile></UserProfile>
            <MoreOptions></MoreOptions>
        </div>
    );
};

export default Header;
