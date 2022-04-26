import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwtPlayLoad;
  try {
    jwtPlayLoad = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPlayLoad = jwtPlayLoad;
  } catch (error) {
    res.status(401).json({ massage: " Not authorized" });
  }

  const { userId, username } = jwtPlayLoad;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1hour",
  });
  res.setHeader("token", newToken);
  // call next
  next();
};
