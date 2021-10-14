import express from "express";
import usersRouter from "./routes/users";
import usuariosRouter from "./routes/usuarios";
import productRouter from "./routes/product";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  if (!("unidade" in req.cookies)) {
    res.cookie("unidade", "Instituto de computação");
    console.log("Cookie criado!");
  } else {
    console.log("Cookie já havia sido criado");
    console.log(req.cookies);
  }
  next();
});

app.use("/user", usersRouter);
app.use("/usuarios", usuariosRouter);
app.use("/product", productRouter);

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`Escutando a porta ${process.env.NODE_DOCKER_PORT}`);
});
