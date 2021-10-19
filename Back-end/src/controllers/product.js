import { Op } from "sequelize";
import { Produto } from "../models/index";
import multer from "multer";
// import path from "path";
import fs from "fs";

const index = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.send(produtos);
  } catch (e) {
    res.status(500).json(e);
  }
};

const create = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.send(produto);
  } catch (e) {
    res.status(500).json(e);
  }
};

const read = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (produto !== null) res.send(produto);
    else res.status(404).json({ msg: "Produto não existe" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [found] = await Produto.update(req.body, { where: { id: id } });
    if (found) res.send({ msg: "Produto atualizado" });
    else res.status(404).json({ msg: "Produto não existe" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Produto.destroy({ where: { id: id } });
    if (found) res.send({ msg: "Produto apagado" });
    else res.status(404).json({ msg: "Produto não existe" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.params;
    const path = `public/uploads/${id}`;
    fs.mkdirSync(path, { recursive: true }, (err) => {});
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (produto !== null) {
      upload.single("image")(req, res, function (e) {
        if (e instanceof multer.MulterError) {
          res.status(500).json(e);
        } else if (e) {
          res.status(500).json(e);
        }
        res.send(req.file);
      });
    } else {
      res.status(404).json({ msg: "produto não existe" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

// const create2 = async (req, res) => {
//   try {
//     console.log(req.file);
//     const produto = await Produto.create(req.body);
//     res.send(produto);
//   } catch (e) {
//     res.status(500).json(e);
//   }
// };
// import { v4 as uuidv64 } from "uuid";

// let products = [];

// const index = (req, res) => {
//   // res.send(products);
// };

// const create = (req, res) => {
//   const product = req.body;
//   products.push({ ...product, id: uuidv64() });
//   return res.status(201).json({ msg: "produto criado" });
// };
// const read = (req, res) => {
//   const { id } = req.params;
//   const product = products.filter((u) => u.id == id);
//   res.send(product);
// };
// const update = (req, res) => {
//   const { id } = req.params;
//   const productID = products.findIndex((u) => u.id == id);
//   if (productID == -1)
//     return res.status(404).json({ msg: "usuario não encontrado" });
//   if (req.body.description)
//     products[productID].description = req.body.description;
//   if (req.body.value) products[productID].value = req.body.value;
//   res.status(200).json({ msg: "usuario atualizado" });
// };
// const remove = (req, res) => {
//   const { id } = req.params;
//   products = products.filter((u) => u.id != id);
//   res.status(200).json({ msg: "usuario apagado" });
// };

export default { index, create, read, update, remove, uploadImage };
