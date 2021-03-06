import { AppDataSource } from "./../data-source";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { Any } from "typeorm";
import { Sign, sign } from "crypto";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { validate } from "class-validator";

export class AuthController {
  static login = async (req: Request, res: Response) => {
    console.log("hitting");
    const { username, password } = req.body;
    if (!(username && password)) {
      return res
        .status(404)
        .json({ message: "Username & Password are required!" });
    }
    const userReposotory = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userReposotory.findOneOrFail({ where: { username } });
    } catch (e) {
      return res
        .status(400)
        .json({ message: " user and password is incorret!" });
    }
    // check password:
    if (!user.checkPassword(password)) {
      return res
        .status(400)
        .json({ message: " user or password  are incorret" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    res.json({ message: "OK", token, userId: user.id, role: user.role });
  };
  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayLoad;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res
        .status(400)
        .json({ massage: " old password & new password are  required" });
    }
    const userReposotory = AppDataSource.getRepository(User);
    let user;
    try {
      user = await userReposotory.findOneOrFail(userId);
    } catch (e) {
      res.status(401).json({ message: " somethings goes wrong " });
    }
    if (!user.changePassword(oldPassword)) {
      return res.status(401).json({ massge: "check your password" });
    }
    user.password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      return res.status(402).json(errors);
    }

    // hash password

    user.hashPassword();
    await userReposotory.save(user);
    res.json({ message: "successful password change}" });
  };
}
export default AuthController;
