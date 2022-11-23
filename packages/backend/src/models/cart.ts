import mongoose, { model, Schema } from "mongoose"
import { CartItem } from "@webshop-app/shared"

const CartSchema = new Schema({
    isBought: Boolean,
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
})

export const CartModel = model<CartItem>("Cart", CartSchema)
