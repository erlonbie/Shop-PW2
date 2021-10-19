import express from "express";
import usersController from "../controllers/users";
const router = express.Router();

router.get("/getList", usersController.index);
router.post("/create", usersController.create);
router.get("/:id", usersController.read);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.remove);

export default router;
