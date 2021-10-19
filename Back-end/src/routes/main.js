import express from "express";
import mainController from "../controllers/main";
const router = express.Router();

router.post("/signup", mainController.signup);
router.post("/login", mainController.login);
router.post("/logout", mainController.logout);

export default router;
