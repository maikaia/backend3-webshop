import { UserItem } from "@webshop-app/shared";
import { saveNewUser, getUser } from "../models/user"

export const saveUser = async (newUser: UserItem): Promise<UserItem | null> => {
  return await saveNewUser(newUser);
};

export const getUserByEmail = async (email: string | undefined): Promise<UserItem | null> => {
  return await getUser(email);
};