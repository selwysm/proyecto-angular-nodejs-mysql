import { AppDataSource } from "./../data-source";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { Any } from "typeorm";

export class AuthController {
  static login = async (req: Request, res: Response) => {
    console.log("hitting");
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(404).json({ message: "100656598" });
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
    res.send(user);
  };
}
export default AuthController;
