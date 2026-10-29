const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Proprietario = sequelize.define(
  "proprietario",
  {
    id_proprietario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: { type: DataTypes.STRING(120), allowNull: false },
    cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
  },
  { freezeTableName: true }
);

module.exports = Proprietario;
