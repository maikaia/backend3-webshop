import React from 'react';
import '../styles/App.css';
import productData from "../data/products.json"
import { Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                React app
                <Link to="/login">Login</Link>
                <Link to="/account">Account</Link>
                {productData.map(item => (
                    <div key={item.id}>
                        <h1>{item.title} - {item.price}$</h1>
                        <img src={item.image}/>
                    </div>
                ))}
            </header>
        </div>
    );
}

export default App;