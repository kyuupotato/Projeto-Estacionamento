import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export type Veiculo = { id_veiculo: number; placa: string; ano: number; mensalidade: string | number; fk_proprietario: number; proprietario?: { nome: string; cpf: string } };
export function useVeiculos() {
  const [items, setItems] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const carregar = useCallback(async () => {
    setLoading(true); setError("");
    try { const r = await axios.get(`${API_BASE_URL}/veiculo`); setItems(r.data); }
    catch { setError("Não foi possível acessar a API. Confira se o Back-End está ligado e o endereço está correto."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { carregar(); }, [carregar]);
  const criar = async (data: Omit<Veiculo, "id_veiculo">) => { await axios.post(`${API_BASE_URL}/veiculo`, data); await carregar(); };
  const atualizar = async (id: number, data: Omit<Veiculo, "id_veiculo">) => { await axios.put(`${API_BASE_URL}/veiculo/${id}`, data); await carregar(); };
  const excluir = async (id: number) => { await axios.delete(`${API_BASE_URL}/veiculo/${id}`); await carregar(); };
  return { items, loading, error, carregar, criar, atualizar, excluir };
}
