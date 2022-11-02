import { UserItem } from "@webshop-app/shared"
import { model, Schema } from "mongoose"
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    address: {type: String, required: true}
})

export const UserModel = model<UserItem>("User", UserSchema)

export const saveUser = async (user: UserItem): Promise<UserItem | null> => {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel(user);
    newUser.save();
    return newUser;
};
