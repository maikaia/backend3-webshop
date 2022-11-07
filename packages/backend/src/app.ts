import express, { Application, json, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UserItem } from "@webshop-app/shared";
import { setupMongoDb } from "./db"
const { UserModel } = require("./models/user");
import { authUser, createToken, JwtRequest } from "./services/auth"
import { saveUser, getUserByEmail } from "./services/user"
const bcrypt = require("bcrypt");

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.port || "8800");
const mongoUrl: string = process.env.MONGODB_URL || "mongodb://127.0.0.1/webshop"

app.use(cors()); // TODO configure cors , this way is not secure
app.use(json()); // Parse json

app.post("/user/create", async (req: Request<UserItem>, res: Response<any>) => {
    const { email } = req.body

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        res.status(409).send("An account with this email already exist.")
    } else {
        const newUser = await saveUser(req.body)
        if (newUser) {
            const userInfo = await getUserByEmail(newUser.email);
            const token = await createToken(newUser.email);
            res.status(200).send({ token, userInfo });
        }
    }
})

app.post(
    "/user/login",
    async (req: JwtRequest<UserItem>, res: Response<string>) => {
      const credentials = req.body;
  
      const userExists = await UserModel.findOne({
        email: credentials.email,
      }).select("+password");
  
      if (userExists) {
        const validPassword = await bcrypt.compare(
          credentials.password,
          userExists.password
        );
        if (validPassword) {
          try {
            const token = createToken(userExists.email);
  
            res.status(200).send(token);
          } catch (e) {
            res.status(400).send(`Error: ${e}`);
          }
        } else {
          res.status(403).send("Wrong password");
        }
      } else {
        res.status(403).send("No user found with this email");
      }
    }
  );

  app.get(
    "/getuser",
    authUser,
    async (req: JwtRequest<UserItem>, res: Response<any>) => {
      const user = req.jwt;
      try {
        const userEmail = await getUserByEmail(user?.email);
        if (userEmail) {
          res.status(200).send(userEmail);
        }
      } catch (error) {
        res.status(403).send(error);
      }
    }
  );

app.listen(port, async function () {
    await setupMongoDb(mongoUrl)
    console.log(`Server running on port: ${port}`);
});