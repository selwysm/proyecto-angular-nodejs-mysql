import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

import {
  validate,
  ValidatePromise,
  ValidationError,
  ValidationOptions,
} from "class-validator";
import { json } from "stream/consumers";

export class UserController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const userReposotory = AppDataSource.getRepository(User);
      const users = await userReposotory.find();

      res.send(users);
    } catch (error) {
      res.status(404).json({ massage: " not  result" });
    }
  };
  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userReposotory = AppDataSource.getRepository(User);
    try {
      const user = await userReposotory.findOneByOrFail({ id: +id });
      res.send(user);
    } catch (error) {
      res.status(404).json({ massage: "not  result" });
    }
  };
  static newUser = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;

    // validate
    console.log({ user });
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // TODO: HASH PASSWORD
    const userReposotory = AppDataSource.getRepository(User);
    try {
      user.hashPassword();
      userReposotory.save(user);
    } catch (error) {
      return res.status(409).json({ message: "username alredy exist" });
    }
    res.send("user create");
  };
  static editUser = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { username, role } = req.body;
    const userReposotory = AppDataSource.getRepository(User);
    // try get user
    try {
      user = await userReposotory.findOneByOrFail({ id: +id });
      console.log(username, role);
      console.log(user);
      user.username = username;
      user.role = role;
    } catch (error) {
      return res.status(404).json({ message: "user not found" });
    }
    // validate error:
    const validationOption = {
      ValidationError: { target: false, value: false },
    };

    const errors = await validate(user, validationOption);
    console.log("error ---->", errors);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    // try to save user

    try {
      await userReposotory.save(user);
    } catch (error) {
      return res.status(409).json({ massage: "username already in use" });
    }
    res.status(201).json({ massage: " user update" });
  };
  static deleteUser = async (req: Request, res: Response) => {
    let user: User;
    const { id } = req.params;
    const userReposotory = AppDataSource.getRepository(User);
    try {
      user = await userReposotory.findOneByOrFail({ id: +id });
    } catch (error) {
      return res.status(404).json({ massage: "user not found" });
    }
    // remove user
    userReposotory.delete(id);
    res.status(201).json({ massage: " successful user  delete" });
  };
}
export default UserController;
