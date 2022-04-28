import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

//  get all users
router.get("/", UserController.getAll);

// get on user
router.get("/:id", UserController.getById);

// create new user    checkRole(["admin"])
router.post("/", UserController.newUser);

// edit user
router.patch("/:id", [checkJwt, checkRole(["admin"])], UserController.editUser);

// delete  user
router.delete(
  "/:id",
  [checkJwt, checkRole(["admin"])],
  UserController.deleteUser
);

export default router;
