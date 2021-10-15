import express from "express";
import usuarioController from "../controllers/usuarios";
const router = express.Router();

router.get("/", usuarioController.index);
router.post("/", usuarioController.create);
router.get("/:nome", usuarioController.indexTipo);

export default router;
