import express from "express";
// import cookieParser from "cookie-parser";
import { v4 as uuid } from "uuid";
import session from "express-session";
import routes from "./routes";

require("dotenv").config();

const app = express();

app.use(express.json());
// app.use(cookieParser());

app.use(
  session({
    genid: () => {
      return uuid();
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 100000 },
  })
);

app.use(routes);

app.get("/uuid", (req, res) => {
  res.send({ uuid: uuid() });
});

// app.use((req, res, next) => {
//   if (!("unidade" in req.cookies)) {
//     res.cookie("unidade", "Instituto de computação");
//     console.log("Cookie criado!");
//   } else {
//     console.log("Cookie já havia sido criado");
//     console.log(req.cookies);
//   }
//   next();
// });

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`Escutando a porta ${process.env.NODE_DOCKER_PORT}`);
});
