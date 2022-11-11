import { UserItem } from "@webshop-app/shared";
import { saveNewUser, getUser, updatedUser } from "../models/user"

export const saveUser = async (newUser: UserItem): Promise<UserItem | null> => {
  return await saveNewUser(newUser);
};

export const getUserByEmail = async (email: string | undefined): Promise<UserItem | null> => {
  return await getUser(email);
};

export const updateUser = async (userEmail: string | undefined, newUserInfo: UserItem): Promise<UserItem | null> => {
  return await updatedUser(userEmail, newUserInfo)
}