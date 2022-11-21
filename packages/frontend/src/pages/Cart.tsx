import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

import { CartItem } from '@webshop-app/shared'
import "../styles/App.css"

function Cart() {
    axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";
    const [cartItems, setCartItems] = useState<CartItem>()

    useEffect(() => {
        getActiveCart()
    }, [])

    const getActiveCart = () => {
        const token = localStorage.getItem("jwt")
        axios.get("/cart/active", {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setCartItems(res.data)
        })
    }

  return (
    <div className="App">
        <div className="App-header">
            {cartItems?.products.map((item) => {
                return <div key={item._id}>
                            <h3>{item.title}</h3>
                            <img src={item.image} alt="bla" />
                        <h1>${item.price}</h1>
                </div>
            })}
        </div>
    </div>
  )
}

export default Cart