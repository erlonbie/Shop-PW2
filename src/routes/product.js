import express from "express";
import productController from "../controllers/product";
const router = express.Router();

router.get("/getList", productController.index);
router.post("/create", productController.create);
router.get("/:id", productController.read);
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;
