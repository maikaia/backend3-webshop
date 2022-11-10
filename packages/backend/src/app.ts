import express, { Application, json, Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import mongoose from "mongoose"

import { CartItem, ProductItem, UserItem } from "@webshop-app/shared";
import { authUser, createToken, JwtRequest } from "./services/auth"
import { saveUser, getUserByEmail } from "./services/user"
import { UserModel } from "./models/user";
import { setupMongoDb } from "./db"
import { CartModel } from "./models/cart";
import { loadProduct, loadProductList, ProductModel, saveProducts } from "./models/product";

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.port || "8800");
const mongoUrl: string = process.env.MONGODB_URL || "mongodb://127.0.0.1/webshop"

app.use(cors());
app.use(json());

app.post("/user/create", async (req: Request<UserItem>, res: Response<any>) => {
    const { email } = req.body

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        res.status(409).send("An account with this email already exists.")
    } else {
        const newUser = await saveUser(req.body)
        if (newUser) {
            const userInfo = await getUserByEmail(newUser.email);
            const token = createToken(newUser.email);
            res.status(200).send({ token, userInfo });
        }
    }
})

app.post("/user/login", async (req: JwtRequest<UserItem>, res: Response<string>) => {
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

app.get("/getUser", authUser, async (req: JwtRequest<UserItem>, res: Response<any>) => {
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

app.post("/products/insert", async (req: Request, res: Response) => {
  res.send(saveProducts())
})

app.get("/products", async (req: Request, res: Response) => {
  res.send(await loadProductList())
})

app.get("/products/:id", async (req: Request<ProductItem["id"]>, res: Response<ProductItem | undefined | null>) => {
  const id = req.params
  res.send(await loadProduct(id))
})

app.get("/cart/active", authUser, async (req: JwtRequest<CartItem>, res: Response) => {
  if (req.jwt?.email) {
    const user = await UserModel.findOne({email: req.jwt.email})
    const cart = await CartModel.findById(user?.activeCart).populate("products")
    if (!cart) {
      return res.sendStatus(404)
    }
    return res.json(cart)
  } else {
    throw new Error("error!")
  }
})

app.post("/cart/active", authUser, async (req: JwtRequest<CartItem>, res: Response) => {
  if (req.jwt?.email) {
    const user = await UserModel.findOne({email: req.jwt.email})
    const cart = await CartModel.findById(user?.activeCart)
    if (!cart) {
      return res.sendStatus(404)
    }
    cart.products.push(req.body.productId)
    await cart.save()
    const savedCart = await CartModel.findById(user?.activeCart).populate("products")
    return res.json(savedCart)
  } else {
    throw new Error("error!")
  }
})

app.delete("/cart/active", authUser, async (req: JwtRequest<CartItem>, res: Response) => {
  if (req.jwt?.email) {
    const user = await UserModel.findOne({email: req.jwt.email})
    const cart = await CartModel.findById(user?.activeCart)
    if (!cart) {
      return res.sendStatus(404)
    }
    const indexOfProduct = cart.products.findIndex(product => product._id == req.body.productId)
    cart.products.splice(indexOfProduct, 1)
    await cart.save()
    const newCart = await CartModel.findById(user?.activeCart).populate("products")
    return res.json(newCart)    
  } else {
    throw new Error("error!")
  }
})

app.listen(port, async function () {
    await setupMongoDb(mongoUrl)
    console.log(`Server running on port: ${port}`);
});
