const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Veiculo = sequelize.define(
  "veiculo",
  {
    id_veiculo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    placa: { type: DataTypes.STRING(10), allowNull: false, unique: true },
    ano: { type: DataTypes.INTEGER, allowNull: false },
    mensalidade: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    fk_proprietario: { type: DataTypes.INTEGER, allowNull: false },
  },
  { freezeTableName: true }
);

module.exports = Veiculo;
