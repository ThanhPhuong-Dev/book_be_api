import { Router } from "express";
import userController from "../../controllers/UserControllers";

const router = Router();

router.get("/getUserAll", userController.getAllUser);
router.get("/getUserDetail/:id", userController.getUserDetails);
router.post("/login", userController.login);
router.post("/sign-up", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

export default router;
