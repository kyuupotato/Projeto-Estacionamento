import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export type Proprietario = { id_proprietario: number; nome: string; cpf: string };
export function useProprietarios() {
  const [items, setItems] = useState<Proprietario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const carregar = useCallback(async () => {
    setLoading(true); setError("");
    try { const r = await axios.get(`${API_BASE_URL}/proprietario`); setItems(r.data); }
    catch { setError("Não foi possível acessar a API. Confira se o Back-End está ligado e o endereço está correto."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { carregar(); }, [carregar]);
  const criar = async (data: { nome: string; cpf: string }) => { await axios.post(`${API_BASE_URL}/proprietario`, data); await carregar(); };
  const atualizar = async (id: number, data: { nome: string; cpf: string }) => { await axios.put(`${API_BASE_URL}/proprietario/${id}`, data); await carregar(); };
  const excluir = async (id: number) => { await axios.delete(`${API_BASE_URL}/proprietario/${id}`); await carregar(); };
  return { items, loading, error, carregar, criar, atualizar, excluir };
}
