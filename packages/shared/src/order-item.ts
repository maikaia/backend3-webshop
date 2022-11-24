import { CartItem } from "./cart-item";
import { UserItem } from "./user-item";

export interface OrderItem {
    _id?: string,
    cart: CartItem,
    orderStatus: "pending" | "registered" | "processing" | "delivering" | "delivered"
    deliveryAddress: UserItem,
    shippingCost: number,
    totalCost: CartItem,
}