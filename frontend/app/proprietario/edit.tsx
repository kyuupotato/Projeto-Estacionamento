import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import FormField from "../../components/FormField";
import AppButton from "../../components/AppButton";
import { styles } from "../../constants/styles";
import { useProprietarios } from "../../hooks/useProprietarios";

export default function ProprietarioEdit() {
  const params = useLocalSearchParams<{ id: string; nome: string; cpf: string }>();
  const [nome, setNome] = useState(params.nome || "");
  const [cpf, setCpf] = useState(params.cpf || "");
  const { atualizar } = useProprietarios();
  const router = useRouter();
  const salvar = async () => {
    if (!nome.trim() || !cpf.trim()) return Alert.alert("Atenção", "Preencha nome e CPF.");
    try { await atualizar(Number(params.id), { nome: nome.trim(), cpf: cpf.trim() }); router.replace("/proprietario"); }
    catch (e: any) { Alert.alert("Erro", e?.response?.data?.erro || "Não foi possível atualizar."); }
  };
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <FormField label="Identificação" value={params.id} editable={false} />
    <FormField label="Nome" value={nome} onChangeText={setNome} />
    <FormField label="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
    <AppButton title="Salvar alterações" onPress={salvar} />
  </ScrollView>;
}
