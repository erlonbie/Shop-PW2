"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.CompraItem);
    }
  }
  Produto.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: "O nome precisa ter entre 3 e 50 caracteres",
          },
        },
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: {
              min: 5,
            },
            msg: "A descricao precisa ter no mínimo 5 caracteres",
          },
        },
      },
      preco: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: "O preço tem que ser maior que zero",
          },
        },
      },
      estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: "O valor do estoque tem que ser maior que zero",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Produto",
    }
  );
  return Produto;
};
