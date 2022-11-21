import { UserItem } from "@webshop-app/shared";
import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"

import "../styles/Navbar.css"

export function Navbar() {
    const [user, setUser] = useState<UserItem | null>()

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        axios.get("/getUser", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            if (res.data) {
                setUser(res.data);
            } else {
                setUser(null)
            }
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
            {user ? <Link to="/login" onClick={() => logOut()}>Logout</Link> : <Link to="/login">Login</Link>} —
            <Link to="/account">Account</Link> —
            {user ? <Link to="/cart/active">Cart</Link> : <Link to="#">Log in to see your cart</Link>}
        </div>

    )
}