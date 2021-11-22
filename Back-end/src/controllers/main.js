import bcrypt from "bcryptjs";
import { Usuario } from "../models";

const signup = async (req, res) => {
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

const login = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ where: { email: req.body.email } });
    if (usuario) {
      bcrypt.compare(req.body.senha, usuario.senha, (err, ok) => {
        if (ok) {
          req.session.userId = usuario.id;
          res.send({ msg: "Usuário logado" });
        } else {
          res.status(401).send({ msg: "Senha não confere" });
        }
      });
    } else {
      res.status(401).send({ msg: "Email inválido" });
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const logout = async (req, res) => {
  req.session.destroy(() => {
    res.send({ msg: "Sessão finalizada" });
  });
};

export default { signup, login, logout };
