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
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
      preco: DataTypes.DECIMAL,
      estoque: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Produto",
    }
  );
  return Produto;
};

