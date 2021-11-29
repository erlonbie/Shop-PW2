import express from "express";
import enderecoController from "../controllers/endereco";
const router = express.Router();

router.get("/", enderecoController.index);
router.get("/:id", enderecoController.read);
router.post("/", enderecoController.create);

export default router;
