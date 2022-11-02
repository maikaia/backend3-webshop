import express, {
    Application,
    Express,
    json,
    Request,
    Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "8800"); 

app.use(cors()); // TODO configure cors , this way is not secure
app.use(json()); // Parse json

app.get("/", (req: Request, res: Response) => {
    res.json({ Message: "Hello World!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});