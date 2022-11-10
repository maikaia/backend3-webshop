import mongoose, { model, Schema } from "mongoose"
import { ProductItem } from "@webshop-app/shared"
import { products } from "../../data/products"

const ProductSchema = new Schema({
    id: Number,
    title: String,
    manufacturer: String,
    description: String,
    category: String,
    image: String,
    weight: Number,
    price: Number,
})

export const ProductModel = model<ProductItem>("ProductItem", ProductSchema)

export const saveProducts = () => {
    ProductModel.insertMany(products)
}

export const loadProductList = (): Promise<ProductItem[]> => {
    return ProductModel.find({}).exec()
}

export const loadProduct = async (id: any): Promise<any> => {
    const product = await ProductModel.findOne(id).exec()
    return product
}   