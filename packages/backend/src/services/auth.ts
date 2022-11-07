import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const JWT_COOKIE_NAME = "jwt";

export type TokenPayload = {
  email: string;
};

export interface JwtRequest<T> extends Request<T> {
  jwt?: TokenPayload;
}

export const createToken = (email: string | undefined) => {
  const SECRET = process.env.JWT_SECRET
  const token = jwt.sign({ email: email }, SECRET, {
    expiresIn: "1h"
  });
  return token;
};

export const authUser = (req: JwtRequest<any>, res: Response, next: any) => {
  const token: string | undefined = req.header("authorization")?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as TokenPayload;
      req.jwt = decoded;
      next();
    } catch {
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(401);
  }
};