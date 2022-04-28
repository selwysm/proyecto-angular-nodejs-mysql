import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = res.locals.jwtPayLoad;
    const userReposotory = AppDataSource.getRepository(User);
    let user: User;

    try {
      user = await userReposotory.findOneOrFail(userId);
    } catch (e) {
      res.status(400).json({ massage: "Not authorized" });
    }

    // check:
    const { role } = user;
    if (roles.includes(role)) {
      next();
    } else {
      res.status(401).json({ massage: "Not authorized" });
    }
  };
};
