import React from 'react';
import '../styles/App.css';
import productData from "../data/products.json"
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
        

function App() {
    let {id} = useParams();

    return (
        <div className="App">
            <header className="App-header">
                React app
                <Link to="/login">Login</Link>
                <Link to="/account">Account</Link>
                {productData.map((item) => {
                    if (item.id == Number(id)) {
                        return <div key={item.id}>
                        <h1>{item.title} - {item.price}$</h1>
                        <img src={item.image}/>
                        <p>{item.category}</p>
                        <p>{item.description}</p>
                        <p>{item.manufacturer}</p>
                        <p>{item.weight} g</p>
                    </div>
                    } return null 
                })}
            </header>
        </div>
    );
}

export default App;