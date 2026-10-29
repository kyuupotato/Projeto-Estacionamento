import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import axios from "axios";
import FormField from "../../components/FormField";
import AppButton from "../../components/AppButton";
import { API_BASE_URL } from "../../constants/api";
import { styles } from "../../constants/styles";
import { useVeiculos } from "../../hooks/useVeiculos";
import { Proprietario } from "../../hooks/useProprietarios";

export default function VeiculoForm() {
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [mensalidade, setMensalidade] = useState("");
  const [dono, setDono] = useState("");
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([]);
  const { criar } = useVeiculos();
  const router = useRouter();
  useEffect(() => { axios.get(`${API_BASE_URL}/proprietario`).then(r => setProprietarios(r.data)).catch(() => Alert.alert("Erro", "Não foi possível carregar os proprietários.")); }, []);
  const salvar = async () => {
    if (!placa.trim() || !ano || !mensalidade || !dono) return Alert.alert("Atenção", "Preencha todos os campos e selecione um proprietário.");
    try { await criar({ placa: placa.trim().toUpperCase(), ano: Number(ano), mensalidade: Number(mensalidade.replace(",", ".")), fk_proprietario: Number(dono) }); router.replace("/veiculo"); }
    catch (e: any) { Alert.alert("Erro", e?.response?.data?.erro || "Não foi possível cadastrar."); }
  };
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <FormField label="Placa" placeholder="ABC1D23" value={placa} onChangeText={setPlaca} autoCapitalize="characters" />
    <FormField label="Ano" placeholder="2020" value={ano} onChangeText={setAno} keyboardType="numeric" />
    <FormField label="Mensalidade (R$)" placeholder="150,00" value={mensalidade} onChangeText={setMensalidade} keyboardType="decimal-pad" />
    <Text style={styles.label}>Proprietário</Text>
    <View style={styles.picker}><Picker selectedValue={dono} onValueChange={setDono}>
      <Picker.Item label="Selecione um proprietário" value="" />
      {proprietarios.map(p => <Picker.Item key={p.id_proprietario} label={`${p.nome} - ${p.cpf}`} value={String(p.id_proprietario)} />)}
    </Picker></View>
    <AppButton title="Salvar veículo" onPress={salvar} />
  </ScrollView>;
}
