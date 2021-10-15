import express from "express";
import mainController from "../controllers/main";
const router = express.Router();

router.post("/", mainController.signup);
router.post("/", mainController.login);
router.post("/", mainController.logout);

export default router;
