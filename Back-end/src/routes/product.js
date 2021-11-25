import express from "express";
import productController from "../controllers/product";
import authUtils from "../utils/auth";
const router = express.Router();

router.get("/getList", productController.index);
router.post("/create", authUtils.isColaborator, productController.create); //adicionar verifyAuth
router.get("/:id", productController.read);
router.patch("/:id", authUtils.isColaborator, productController.update);
router.delete("/:id", authUtils.isColaborator, productController.remove);
router.post("/img/:id", productController.uploadImage);

export default router;
