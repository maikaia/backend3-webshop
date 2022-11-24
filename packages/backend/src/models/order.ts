import { OrderItem } from "@webshop-app/shared"
import mongoose, { model, Schema } from "mongoose"

const OrderSchema = new Schema({
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: "Cart"}], 
    orderStatus: {type: String, default: "pending"},
    deliveryAddress: String,
    shippingCost: Number,
    totalCost: Number,
})

export const OrderModel = model<OrderItem>("Order", OrderSchema)


// cart-checkout button onclick => 
// save cart items along with rest of order info to order collection/model => 
// remove cart & give user NEW cart || empty existing cart and give it back??

// account-previous orders button onclick => 
// redirect to "ReceiptsPage" => 
// render list of all previous orders: get all items in collection with _id tied to current user
