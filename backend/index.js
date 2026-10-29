require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/db");
const Proprietario = require("./models/Proprietario");
const Veiculo = require("./models/Veiculo");
const proprietarioRoutes = require("./controllers/ProprietarioController");
const veiculoRoutes = require("./controllers/VeiculoController");

const app = express();
const port = Number(process.env.PORT) || 8081;

Proprietario.hasMany(Veiculo, {
  foreignKey: "fk_proprietario",
  as: "veiculos",
  onDelete: "RESTRICT",
});
Veiculo.belongsTo(Proprietario, {
  foreignKey: "fk_proprietario",
  as: "proprietario",
});

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.json({ mensagem: "API do Estacionamento funcionando." }));
app.use("/proprietario", proprietarioRoutes);
app.use("/veiculo", veiculoRoutes);
app.use((req, res) => res.status(404).json({ erro: "Rota não encontrada." }));

sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(port, "0.0.0.0", () => console.log(`API rodando na porta ${port}`));
  })
  .catch((error) => {
    console.error("Falha ao conectar ao MySQL. Confira o serviço e o arquivo .env.", error.message);
    process.exit(1);
  });
