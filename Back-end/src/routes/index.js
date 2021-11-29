import express from "express";
const router = express.Router();
import usersRouter from "./users";
import usuariosRouter from "./usuarios";
import productRouter from "./product";
import mainRouter from "./main";
import enderecosRouter from "./endereco";
import compraRouter from "./compra";
import compraItemRouter from "./compraItem";

router.use("/user", usersRouter);
router.use("/usuarios", usuariosRouter);
router.use("/product", productRouter);
router.use("/", mainRouter);
router.use("/endereco", enderecosRouter);
router.use("/compra", compraRouter);
router.use("/compraitem", compraItemRouter);

export default router;
