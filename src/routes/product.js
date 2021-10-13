import express from "express";
import productController from "../controllers/product";
// import multer from "multer";
const router = express.Router();

router.get("/getList", productController.index);
router.post("/create", productController.create);
router.get("/:id", productController.read);
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);
// router.post("/img/:id", productController.uploadImage);

// app.post("/product/create-img", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("Single file upload success");
// });

router.post("/img/:id", productController.uploadImage);

export default router;
