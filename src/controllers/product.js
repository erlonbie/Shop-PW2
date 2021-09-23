import { v4 as uuidv64 } from "uuid";

let products = [];

const index = (req, res) => {
  res.send(products);
};

const create = (req, res) => {
  const product = req.body;
  products.push({ ...product, id: uuidv64() });
  return res.status(201).json({ msg: "produto criado" });
};
const read = (req, res) => {
  const { id } = req.params;
  const product = products.filter((u) => u.id == id);
  res.send(product);
};
const update = (req, res) => {
  const { id } = req.params;
  const productID = products.findIndex((u) => u.id == id);
  if (productID == -1)
    return res.status(404).json({ msg: "usuario não encontrado" });
  if (req.body.description)
    products[productID].description = req.body.description;
  if (req.body.value) products[productID].value = req.body.value;
  res.status(200).json({ msg: "usuario atualizado" });
};
const remove = (req, res) => {
  const { id } = req.params;
  products = products.filter((u) => u.id != id);
  res.status(200).json({ msg: "usuario apagado" });
};

export default { index, create, read, update, remove };
