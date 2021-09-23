import express from "express";
import usersRouter from "./routes/users";
import productRouter from "./routes/product";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/user", usersRouter);
app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log(`Escutando a porta ${PORT}`);
});
