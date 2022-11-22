import { useState, useEffect } from 'react'
import axios from "axios"

import { CartItem } from '@webshop-app/shared'
import "../styles/App.css"

function Cart() {
    axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:8800";
    const [cartItems, setCartItems] = useState<CartItem>()

    useEffect(() => {
        getActiveCart()
    }, [])

    const getActiveCart = async (): Promise<any> => {
        const token = localStorage.getItem("jwt")
        await axios.get("/cart/active", {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setCartItems(res.data)
        })
    }

    const removeCartItem = async (_id: string | undefined): Promise<any> => {
        const token = localStorage.getItem("jwt")
        await axios.delete("/cart/active", {
            headers: {
                authorization: `Bearer ${token}`
            },
            data: {
                productId: _id,
                token
            }
        })
        .then(getActiveCart)
        .catch((err) => {
            throw new Error(err)
        })
    }

    return (
      <div className="App">
          <div className="App-header">
            {cartItems?.products.length ? cartItems?.products.map((item) => {
                    return <div key={item._id}>
                        <h3>{item.title}</h3>
                        <img src={item.image} alt={item.title} />
                        <h1>${item.price}</h1>
                        <button onClick={() => {removeCartItem(item._id)}}>remove item</button>
                    </div>
                }) : <div>Cart is empty. Buy more stuff.</div>}
          </div>
      </div>
    )
}

export default Cart