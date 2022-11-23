import { OrderItem } from "@webshop-app/shared"
import mongoose, { model, Schema } from "mongoose"

const OrderSchema = new Schema({
    totalCost: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"},
    shippingCost: Number,
    orderProducts: [{type: mongoose.Schema.Types.ObjectId, ref: "Cart"}],
    deliveryAdress: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    orderStatus: String
})

export const OrderModel = model<OrderItem> 