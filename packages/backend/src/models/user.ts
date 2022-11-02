import { UserItem } from "@webshop-app/shared"
import { model, Schema } from "mongoose"

const UserSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    phoneNumber: Number,
    address: String
})

const UserModel = model<UserItem>("User", UserSchema)

export const saveUser = async (user: UserItem): Promise<UserItem | null> => {
    const newModel = new UserModel(user);
    newModel.save();
    return newModel;
};