import express from "express";
import productController from "../controllers/product";
import authUtils from "../utils/auth";
const router = express.Router();

router.get("/getList", productController.index);
router.post("/create", authUtils.verifyAuth, productController.create);
router.get("/:id", productController.read);
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);
router.post("/img/:id", productController.uploadImage);

export default router;
