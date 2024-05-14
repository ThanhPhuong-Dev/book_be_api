import { Router } from "express";
import userController from "../../controllers/UserControllers";

const router = Router();

router.get("/getUserAll", userController.getAllUser);
router.get("/getUserDetail/:id", userController.getUserDetails);
router.post("/login", userController.login);
router.post("/sign-up", userController.createUser);

export default router;
