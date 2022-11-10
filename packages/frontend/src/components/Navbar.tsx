import { UserItem } from "@webshop-app/shared";
import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"

import "../styles/Navbar.css"

export function Navbar() {
    const [user, setUser] = useState<UserItem>()

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        axios.get("/getUser", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const logOut = async () => {
        localStorage.clear()
        window.location.reload()
    };

    return (
        <div className="Navbar">
            <Link to="/">Home</Link> —
            {user ? <Link to={"/login"} onClick={() => logOut()}>Logout</Link> : <Link to="/login">Login</Link>} —
            <Link to="/account">Account</Link>
        </div>

    )
}