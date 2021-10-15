import express from "express";
const router = express.Router();
import usersRouter from "./users";
import usuariosRouter from "./usuarios";
import productRouter from "./product";
import mainRouter from "./main";

router.use("/user", usersRouter);
router.use("/usuarios", usuariosRouter);
router.use("/product", productRouter);
router.use("/", mainRouter);

export default router;
