import express from "express";
import usersRouter from "./routes/users";
import productRouter from "./routes/product";
import multer from "multer";
import path from "path";
// const multer = require("multer");
// const path = require("path");

require("dotenv").config();

const app = express();
// const PORT = 3000;

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/product/create-img", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});

app.use(express.json());
app.use("/user", usersRouter);
app.use("/product", productRouter);

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`Escutando a porta ${process.env.NODE_DOCKER_PORT}`);
});
