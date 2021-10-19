import { v4 as uuidv64 } from "uuid";

let users = [];

const index = (req, res) => {
  res.send(users);
};

const create = (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv64() });
  return res.status(201).json({ msg: "usuário criado" });
};
const read = (req, res) => {
  const { id } = req.params;
  const user = users.filter((u) => u.id == id);
  res.send(user);
};
const update = (req, res) => {
  const { id } = req.params;
  const userID = users.findIndex((u) => u.id == id);
  if (userID == -1)
    return res.status(404).json({ msg: "usuario não encontrado" });
  if (req.body.name) users[userID].name = req.body.name;
  if (req.body.email) users[userID].email = req.body.email;
  res.status(200).json({ msg: "usuario atualizado" });
};
const remove = (req, res) => {
  const { id } = req.params;
  users = users.filter((u) => u.id != id);
  res.status(200).json({ msg: "usuario apagado" });
};

export default { index, create, read, update, remove };
