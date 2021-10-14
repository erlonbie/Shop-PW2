import { Usuario, TipoUsuario } from "../models";

const index = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ include: TipoUsuario });
    res.send(usuarios);
  } catch (e) {
    res.status(500).send(e);
  }
};

const create = async (req, res) => {
  try {
    await Usuario.create(req.body);
    res.send({ msg: "Usuário criado" });
  } catch (e) {
    res.status(500).send(e);
  }
};

export default { index, create };
