const express = require("express");
const { Op } = require("sequelize");
const Veiculo = require("../models/Veiculo");
const Proprietario = require("../models/Proprietario");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Veiculo.findAll({
      include: [{ model: Proprietario, as: "proprietario", attributes: ["id_proprietario", "nome", "cpf"] }],
      order: [["id_veiculo", "DESC"]],
    });
    res.json(items);
  } catch (e) { res.status(500).json({ erro: "Não foi possível listar veículos." }); }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Veiculo.findByPk(req.params.id, { include: [{ model: Proprietario, as: "proprietario" }] });
    if (!item) return res.status(404).json({ erro: "Veículo não encontrado." });
    res.json(item);
  } catch (e) { res.status(500).json({ erro: "Erro ao buscar veículo." }); }
});

router.post("/", async (req, res) => {
  try {
    const { placa, ano, mensalidade, fk_proprietario } = req.body;
    if (!placa?.trim() || !Number.isInteger(Number(ano)) || Number(ano) < 1900 ||
        !Number.isFinite(Number(mensalidade)) || Number(mensalidade) < 0 || !Number(fk_proprietario)) {
      return res.status(400).json({ erro: "Preencha placa, ano, mensalidade e proprietário corretamente." });
    }
    const dono = await Proprietario.findByPk(Number(fk_proprietario));
    if (!dono) return res.status(400).json({ erro: "O proprietário informado não existe." });
    const item = await Veiculo.create({
      placa: placa.trim().toUpperCase(), ano: Number(ano),
      mensalidade: Number(mensalidade), fk_proprietario: Number(fk_proprietario)
    });
    res.status(201).json(item);
  } catch (e) { res.status(400).json({ erro: e.name === "SequelizeUniqueConstraintError" ? "Esta placa já está cadastrada." : "Não foi possível cadastrar veículo." }); }
});

router.put("/:id", async (req, res) => {
  try {
    const item = await Veiculo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: "Veículo não encontrado." });
    const { placa, ano, mensalidade, fk_proprietario } = req.body;
    if (!placa?.trim() || !Number.isInteger(Number(ano)) || Number(ano) < 1900 ||
        !Number.isFinite(Number(mensalidade)) || Number(mensalidade) < 0 || !Number(fk_proprietario)) {
      return res.status(400).json({ erro: "Preencha placa, ano, mensalidade e proprietário corretamente." });
    }
    const dono = await Proprietario.findByPk(Number(fk_proprietario));
    if (!dono) return res.status(400).json({ erro: "O proprietário informado não existe." });
    await item.update({ placa: placa.trim().toUpperCase(), ano: Number(ano), mensalidade: Number(mensalidade), fk_proprietario: Number(fk_proprietario) });
    res.json(item);
  } catch (e) { res.status(400).json({ erro: "Não foi possível atualizar. Verifique se a placa já existe." }); }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Veiculo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: "Veículo não encontrado." });
    await item.destroy();
    res.json({ mensagem: "Veículo excluído com sucesso." });
  } catch (e) { res.status(500).json({ erro: "Não foi possível excluir veículo." }); }
});

module.exports = router;
