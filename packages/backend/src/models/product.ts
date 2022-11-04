import { ProductItem } from "@webshop-app/shared/src/product-item"
import { Schema, model } from "mongoose"

const ProductSchema = new Schema({
    title: String,
    manufacturer: String,
    description: String,
    category: String,
    picture: String,
    weight: Number,
    price: Number
})

const ProductModel = model<ProductItem>("Product", ProductSchema)
