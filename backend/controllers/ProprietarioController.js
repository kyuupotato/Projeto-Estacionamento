const express = require("express");
const Proprietario = require("../models/Proprietario");
const router = express.Router();

router.get("/", async (req, res) => {
  try { res.json(await Proprietario.findAll({ order: [["id_proprietario", "DESC"]] })); }
  catch (e) { res.status(500).json({ erro: "Não foi possível listar proprietários." }); }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Proprietario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: "Proprietário não encontrado." });
    res.json(item);
  } catch (e) { res.status(500).json({ erro: "Erro ao buscar proprietário." }); }
});

router.post("/", async (req, res) => {
  try {
    const { nome, cpf } = req.body;
    if (!nome?.trim() || !cpf?.trim()) return res.status(400).json({ erro: "Informe nome e CPF." });
    const item = await Proprietario.create({ nome: nome.trim(), cpf: cpf.trim() });
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ erro: e.name === "SequelizeUniqueConstraintError" ? "Este CPF já está cadastrado." : "Não foi possível cadastrar." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const item = await Proprietario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: "Proprietário não encontrado." });
    const { nome, cpf } = req.body;
    if (!nome?.trim() || !cpf?.trim()) return res.status(400).json({ erro: "Informe nome e CPF." });
    await item.update({ nome: nome.trim(), cpf: cpf.trim() });
    res.json(item);
  } catch (e) { res.status(400).json({ erro: "Não foi possível atualizar. Verifique se o CPF já existe." }); }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Proprietario.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: "Proprietário não encontrado." });
    await item.destroy();
    res.json({ mensagem: "Proprietário excluído com sucesso." });
  } catch (e) { res.status(500).json({ erro: "Não foi possível excluir. Verifique se há veículos vinculados." }); }
});

module.exports = router;
