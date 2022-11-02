import express, {
    Application,
    Express,
    json,
    Request,
    Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UserItem } from "@webshop-app/shared";
import { setupMongoDb, saveUser } from "./db"


dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.port || "8800");
const mongoUrl: string = process.env.MONGODB_URL || "mongodb://127.0.0.1/user"

app.use(cors()); // TODO configure cors , this way is not secure
app.use(json()); // Parse json

app.post("/user/create", async (req: Request<UserItem>, res: Response<any>) => {
    const newUser = await saveUser(req.body)
    if (newUser) {
        console.log(newUser)
        res.status(200).send({ newUser })
    } else {
        res.status(400).send("Something went wrong. Please try again.")
    }
})

app.listen(port, async function () {
    await setupMongoDb(mongoUrl)
    console.log(`Server running on port: ${port}`);
});