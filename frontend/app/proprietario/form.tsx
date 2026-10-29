import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import FormField from "../../components/FormField";
import AppButton from "../../components/AppButton";
import { styles } from "../../constants/styles";
import { useProprietarios } from "../../hooks/useProprietarios";

export default function ProprietarioForm() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const { criar } = useProprietarios();
  const router = useRouter();
  const salvar = async () => {
    if (!nome.trim() || !cpf.trim()) return Alert.alert("Atenção", "Preencha nome e CPF.");
    try { await criar({ nome: nome.trim(), cpf: cpf.trim() }); router.replace("/proprietario"); }
    catch (e: any) { Alert.alert("Erro", e?.response?.data?.erro || "Não foi possível cadastrar."); }
  };
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <FormField label="Nome" placeholder="Digite o nome" value={nome} onChangeText={setNome} />
    <FormField label="CPF" placeholder="Digite o CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
    <AppButton title="Salvar" onPress={salvar} />
  </ScrollView>;
}
