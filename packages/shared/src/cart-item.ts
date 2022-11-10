import { ProductItem } from "./product-item";

export interface CartItem {
    _id?: string,
    isBought: boolean,
    products: ProductItem[]
}