import bcrypt from "bcryptjs";
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
    bcrypt.genSalt(parseInt(process.env.BRCYPT_ROUNDS), (err, salt) => {
      bcrypt.hash(req.body.senha, salt, async (err, hash) => {
        await Usuario.create({ ...req.body, senha: hash });
        res.send({ msg: "Usuário criado" });
      });
    });
    // await Usuario.create(req.body);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const indexTipo = async (req, res) => {
  try {
    const tipoUsuario = req.params.nome;
    if (tipoUsuario === "cliente") {
      const usuarios = await Usuario.findAll({ where: { tipoUsuarioId: 1 } });
      res.send(usuarios);
    } else if (tipoUsuario === "colaborador") {
      const usuarios = await Usuario.findAll({ where: { tipoUsuarioId: 2 } });
      res.send(usuarios);
    } else {
      res.send({ msg: "Tipo de usuário não encontrado" });
    }
  } catch (e) {
    /* handle error */
    res.status(500).send(e.message);
  }
};

export default { index, create, indexTipo };
