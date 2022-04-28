import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwtPayLoad;

  try {
    jwtPayLoad = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPlayLoad = jwtPayLoad;
  } catch (e) {
    res.status(401).json({ massage: " Not authorized" });
  }

  const { userId, username } = jwtPayLoad;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);
  // call next
  next();
};
