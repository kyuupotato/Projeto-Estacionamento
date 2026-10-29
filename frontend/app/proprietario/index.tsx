import React from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../../components/AppButton";
import { styles } from "../../constants/styles";
import { useProprietarios } from "../../hooks/useProprietarios";

export default function ProprietariosScreen() {
  const router = useRouter();
  const { items, loading, error, excluir, carregar } = useProprietarios();
  const confirmarExcluir = (id: number) => Alert.alert("Excluir proprietário", "Deseja realmente excluir este proprietário?", [
    { text: "Cancelar", style: "cancel" },
    { text: "Excluir", style: "destructive", onPress: async () => {
      try { await excluir(id); } catch { Alert.alert("Erro", "Não foi possível excluir. Veja se existem veículos vinculados."); }
    }}
  ]);
  return <View style={styles.container}>
    <View style={styles.content}>
      <AppButton title="+ Novo proprietário" onPress={() => router.push("/proprietario/form")} />
      {error ? <Text>{error}</Text> : null}
      {loading ? <Text>Carregando...</Text> : null}
      <FlatList data={items} keyExtractor={x => String(x.id_proprietario)} refreshing={loading} onRefresh={carregar}
        ListEmptyComponent={<Text style={styles.muted}>Nenhum proprietário cadastrado.</Text>}
        renderItem={({ item }) => <View style={styles.card}>
          <Text style={{ fontWeight: "800", fontSize: 18 }}>{item.nome}</Text>
          <Text style={styles.muted}>CPF: {item.cpf}</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}><AppButton title="Editar" variant="secondary" onPress={() => router.push({ pathname: "/proprietario/edit", params: { id: String(item.id_proprietario), nome: item.nome, cpf: item.cpf } })} /></View>
            <View style={{ flex: 1 }}><AppButton title="Excluir" variant="danger" onPress={() => confirmarExcluir(item.id_proprietario)} /></View>
          </View>
        </View>} />
    </View>
  </View>;
}
