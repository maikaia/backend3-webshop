import express, {
    Application,
    Express,
    json,
    Request,
    Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import {UserItem} from "@webshop-app/shared";
import { setupMongoDb } from "./db"

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "8800"); 
const mongoUrl:string = process.env.MONGODB_URL || "mongodb://127.0.0.1/message"

app.use(cors()); // TODO configure cors , this way is not secure
app.use(json()); // Parse json

app.get("/", (req: Request, res: Response) => {
    res.json({ Message: "Hello World!" });
});

app.listen(PORT, async function () {
    await setupMongoDb(mongoUrl)
    console.log(`Server running on port: ${PORT}`);
});