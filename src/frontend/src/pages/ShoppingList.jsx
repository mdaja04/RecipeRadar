import React, {useEffect, useState} from 'react';
import './ShoppingList.css'
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";


const ShoppingList = () => {
    const[username, setUsername] = useState("");
    const[items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usernameResponse = await fetch(`https://reciperadar-e0s5.onrender.com/users/me`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
                });
                const userData = await usernameResponse.json();
                setUsername(userData.username);

                // Fetch items after the username has been set
                fetchItems(userData.username);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [navigate]);

    const fetchItems = async (username) => {
        try {
            const response = await fetch(`https://reciperadar-e0s5.onrender.com/shopping-list/${username}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            });
            setItems(await response.json());
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const removeItem = async (item) => {
        try{
            const response = await fetch(`https://reciperadar-e0s5.onrender.com/shopping-list/delete/${username}/${item}`, {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            })
            //setItems(await response.json());
        }catch{
        }
    }

    return (
        <div className="page-container">
            <Header />
            <div className="inner-container">
                <table className="items-table">
                    <thead>
                    <tr>
                        <th>Item</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={`${item}-${index}`}>
                            <td>
                                {item}
                            </td>
                            <td>
                                <input className="list-checkbox" type="checkbox" onClick={() => removeItem(item)}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default ShoppingList;
