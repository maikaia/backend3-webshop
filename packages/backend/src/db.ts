import {UserItem} from "@webshop-app/shared"
import { connect, model, Schema } from "mongoose"

const UserSchema = new Schema({
    text: String,
    author: String,
    timeStamp: Date
})

const MessageModel = model<UserItem>("UserItem", UserSchema)

export const setupMongoDb = async (url: string) => {
    try {
        console.info(`Setup MongoDB connection to ${url}!`);
        await connect(url);
    } catch (e) {
        console.error("Error connecting to MongoDB!", e);
        throw e;
    }
}