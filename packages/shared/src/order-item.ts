import { CartItem } from "./cart-item";
import { UserItem } from "./user-item";

export interface OrderItem {
    _id?: string,
    totalCost: CartItem,
    shippingCost: number,
    orderProducts: CartItem,
    deliveryAdress: UserItem,
    orderStatus: "registered" | "processing" | "delivering" | "delivered"
}