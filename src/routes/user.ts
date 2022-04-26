import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";
const router = Router();
//  get all users
router.get("/", [checkJwt], UserController.getAll);

// get on user
router.get("/:id", [checkJwt], UserController.getById);

// create new user    checkRole(["admin"])
router.post("/", [checkJwt], UserController.newUser);

// edit user
router.patch("/:id", [checkJwt], UserController.editUser);

// delete  user
router.delete("/:id", [checkJwt], UserController.deleteUser);

export default router;
