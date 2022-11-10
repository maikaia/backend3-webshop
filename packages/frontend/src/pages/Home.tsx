import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProductItem } from "@webshop-app/shared";
import axios from "axios"

import '../styles/App.css';

function Home() {
    const [products, setProducts] = useState<ProductItem[]>()
    axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";

    useEffect(() => {
        axios.get("/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {products?.map((item) =>
                    <div key={item.id}>
                        <Link to={`products/${item.id}`}>
                            <h1>{item.title}</h1>
                            <img src={item.image} alt="bla" />
                        </Link>
                        <h1>${item.price}</h1>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Home;