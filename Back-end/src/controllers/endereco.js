import { Endereco, Usuario } from "../models";

const index = async (req, res) => {
  try {
    const Enderecos = await Endereco.findAll({ include: Usuario });
    res.send(Enderecos);
  } catch (error) {
    res.status(500).send(error);
  }
};
const create = async (req, res) => {
  try {
    const endereco = await Endereco.create(req.body);
    res.send({ msg: "Endereco criado", endereco });
  } catch (error) {
    res.status(500).send(error);
  }
};

const read = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const enderecos = await Endereco.findAll({
      where: { id },
      include: Usuario,
    });
    console.log(enderecos);
    if (enderecos.length > 0) {
      res.send(enderecos);
    } else {
      res.status(404).send({
        msg: "Endereco não encontrado",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { index, create, read };
