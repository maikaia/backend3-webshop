import express, { Application, json, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UserItem } from "@webshop-app/shared";
import { setupMongoDb } from "./db"
import { saveUser } from "./models/user"
const { UserModel } = require("./models/user");



dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.port || "8800");
const mongoUrl: string = process.env.MONGODB_URL || "mongodb://127.0.0.1/user"

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
            console.log(newUser)
            res.status(200).send({ newUser })
        }
    }
})

app.listen(port, async function () {
    await setupMongoDb(mongoUrl)
    console.log(`Server running on port: ${port}`);
});