import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { checkJwt } from "../middlewares/jwt";

const router = Router();
// login
router.post("/login", AuthController.login);
export default router;

//change password

router.post("/change-password", [checkJwt], AuthController.changePassword);
