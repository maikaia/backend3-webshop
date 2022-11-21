import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios"

import { ProductItem } from '@webshop-app/shared';
import '../styles/App.css';

function Detail() {
    axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";
    const [products, setProducts] = useState<ProductItem[]>()
    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true)
    let { id } = useParams();

    const checkUserStatus = () => {
        if(localStorage.jwt) {
            setIsLoggedOut(false)
        } else {
            setIsLoggedOut(true)
        }
    }
    
    const handleAddToCart = async (_id: string | undefined): Promise<void> => {
        const token = localStorage.getItem("jwt")
        await axios.post("/cart/active", {
            productId: _id,
            token
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {})
        .catch((err) => {
            throw new Error("couldn't add to cart")
        })
    }

    useEffect(() => {
        axios.get("/products")
        .then((res) => {
            setProducts(res.data);
        })
        .then(() => {
            checkUserStatus()
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    

    return (
        <div className="App">
            <header className="App-header">
                {products?.map((item) => {
                    if (item.id === Number(id)) {
                        return <div key={item.id}>
                            <h1>{item.title} - ${item.price}</h1>
                            <img src={item.image} alt={item.title} />
                            <p>{item.category}</p>
                            <p>{item.description}</p>
                            <p>{item.manufacturer}</p>
                            <p>{item.weight}g</p>
                            <button onClick={() => {handleAddToCart(item._id)}} disabled={isLoggedOut}>Add to cart</button>
                        </div>
                    } return null
                })}
            </header>
        </div>
    );
}

export default Detail;