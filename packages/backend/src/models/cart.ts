import mongoose, { model, Schema } from "mongoose"
import { CartItem, ProductItem, UserItem } from "@webshop-app/shared"

const CartSchema = new Schema({
    isBought: Boolean,
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductItem"}]
})

export const CartModel = model<CartItem>("Cart", CartSchema)
