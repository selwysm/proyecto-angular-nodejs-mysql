import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
//  get all users
router.get("/", UserController.getAll);

// get on user
router.get("/:id", UserController.getById);

// create new user
router.post("/", UserController.newUser);

// edit user
router.patch("/:id", UserController.editUser);

// delete  user
router.delete("/:id", UserController.deleteUser);

export default router;
