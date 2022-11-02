import {UserItem} from "@webshop-app/shared"
import { connect, model, Schema } from "mongoose"

const UserSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    phoneNumber: Number,
    address: String
})

const UserModel = model<UserItem>("User", UserSchema)

export const setupMongoDb = async (url: string) => {
    try {
        console.info(`Setup MongoDB connection to ${url}!`);
        await connect(url);
    } catch (e) {
        console.error("Error connecting to MongoDB!", e);
        throw e;
    }
}

export const saveUser = async (user: UserItem): Promise<UserItem | null> => {  
    const newModel = new UserModel(user);
    newModel.save();
    return newModel;
  };