import '../styles/App.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ProductItem } from '@webshop-app/shared';
import axios from "axios"


function Detail() {
    const [products, setProducts] = useState<ProductItem[]>()
    let { id } = useParams();

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

export default Detail;