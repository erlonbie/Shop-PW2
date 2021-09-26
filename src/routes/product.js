import express from "express";
import productController from "../controllers/product";
// import multer from "multer";
const router = express.Router();

router.get("/getList", productController.index);
router.post("/create", productController.create);
router.get("/:id", productController.read);
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, `../public/uploads/${file.filename}`);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: fileStorageEngine });

// router.post("/create-img", upload.single("image"), productController.create2);

export default router;
