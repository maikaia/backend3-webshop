import { UserItem } from "@webshop-app/shared"
import { model, Schema } from "mongoose"
import bcrypt from 'bcrypt';
import { CartModel } from "./cart";

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    activeCart: { type: Schema.Types.ObjectId, ref: "Cart" }
})

export const UserModel = model<UserItem>("User", UserSchema)

export const saveNewUser = async (user: UserItem): Promise<UserItem | null> => {
    const newCart = new CartModel({ products: [], isBought: false })
    await newCart.save()
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({ ...user, activeCart: newCart.id });
    await newUser.save();
    return newUser;
};

export const getUser = async (email: string | undefined): Promise<UserItem | null> => {
    const userInfo = await UserModel.findOne({ email: email }).select("-password");
    return userInfo
};

export const updatedUser = async (
    userEmail: string | undefined,
    newUserInfo: UserItem
): Promise<UserItem | null> => {
    const userId = await UserModel.findOne({ email: userEmail });

    return await UserModel.findByIdAndUpdate(
        userId?._id,
        {
            fullName: newUserInfo.fullName,
            email: newUserInfo.email,
            phoneNumber: newUserInfo.phoneNumber,
            address: newUserInfo.address,
        },
        { new: true }
    );
};