import { Link } from 'react-router-dom';

import '../styles/App.css';
import productData from "../data/products.json"

function App() {
    return (
        <div className="App">
            <header className="App-header">
                React app
                <Link to="/login">Login</Link>
                <Link to="/account">Account</Link>
                {productData.map(item => (
                    <div key={item.id}>
                        <h1><Link to={`/product/${item.id}`}> {item.title} </Link> - ${item.price}</h1>
                        <img src={item.image} alt="pic of item"/>
                    </div>
                ))}
            </header>
        </div>
    );
}

export default App;