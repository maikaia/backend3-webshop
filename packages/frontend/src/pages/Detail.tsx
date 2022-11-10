import '../styles/App.css';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductItem, UserItem } from '@webshop-app/shared';
import axios from "axios"


function App() {
    const [products, setProducts] = useState<ProductItem[]>()
    const [user, setUser] = useState<UserItem>()
    let { id } = useParams();
    console.log(id)
    const navigate = useNavigate()

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

        axios.get("/products")
            .then((res) => {
                setProducts(res.data);
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
        <div className="App">
            <header className="App-header">
                React app
                {user ? <button onClick={logOut}>Logout</button> : <Link to="/login">Login</Link>}
                <Link to="/account">Account</Link>
                <Link to="/">Home</Link>
                {products?.map((item) => {
                    if (item.id === Number(id)) {
                        return <div key={item.id}>
                            <h1>{item.title} - ${item.price}</h1>
                            <img src={item.image} alt="info about product" />
                            <p>{item.category}</p>
                            <p>{item.description}</p>
                            <p>{item.manufacturer}</p>
                            <p>{item.weight}g</p>
                        </div>
                    } return null
                })}
            </header>
        </div>
    );
}

export default App;