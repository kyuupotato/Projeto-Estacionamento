import React from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../../components/AppButton";
import { styles } from "../../constants/styles";
import { useVeiculos } from "../../hooks/useVeiculos";

export default function VeiculosScreen() {
  const router = useRouter();
  const { items, loading, error, excluir, carregar } = useVeiculos();
  const confirmarExcluir = (id: number) => Alert.alert("Excluir veículo", "Deseja realmente excluir este veículo?", [
    { text: "Cancelar", style: "cancel" },
    { text: "Excluir", style: "destructive", onPress: async () => {
      try { await excluir(id); } catch { Alert.alert("Erro", "Não foi possível excluir o veículo."); }
    }}
  ]);
  return <View style={styles.container}><View style={styles.content}>
    <AppButton title="+ Novo veículo" onPress={() => router.push("/veiculo/form")} />
    {error ? <Text>{error}</Text> : null}
    {loading ? <Text>Carregando...</Text> : null}
    <FlatList data={items} keyExtractor={x => String(x.id_veiculo)} refreshing={loading} onRefresh={carregar}
      ListEmptyComponent={<Text style={styles.muted}>Nenhum veículo cadastrado.</Text>}
      renderItem={({ item }) => <View style={styles.card}>
        <Text style={{ fontWeight: "800", fontSize: 18 }}>{item.placa}</Text>
        <Text style={styles.muted}>Ano: {item.ano}</Text>
        <Text style={styles.muted}>Mensalidade: R$ {Number(item.mensalidade).toFixed(2)}</Text>
        <Text style={styles.muted}>Proprietário: {item.proprietario?.nome || `ID ${item.fk_proprietario}`}</Text>
        <View style={styles.row}>
          <View style={{ flex: 1 }}><AppButton title="Editar" variant="secondary" onPress={() => router.push({ pathname: "/veiculo/edit", params: { id: String(item.id_veiculo), placa: item.placa, ano: String(item.ano), mensalidade: String(item.mensalidade), fk_proprietario: String(item.fk_proprietario) } })} /></View>
          <View style={{ flex: 1 }}><AppButton title="Excluir" variant="danger" onPress={() => confirmarExcluir(item.id_veiculo)} /></View>
        </View>
      </View>} />
  </View></View>;
}
