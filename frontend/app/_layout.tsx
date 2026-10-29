import React from "react";
import { Stack } from "expo-router";
import { colors } from "../constants/styles";

export default function RootLayout() {
  return <Stack screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "700" } }}>
    <Stack.Screen name="index" options={{ title: "Estacionamento" }} />
    <Stack.Screen name="proprietario/index" options={{ title: "Proprietários" }} />
    <Stack.Screen name="proprietario/form" options={{ title: "Cadastrar proprietário" }} />
    <Stack.Screen name="proprietario/edit" options={{ title: "Editar proprietário" }} />
    <Stack.Screen name="veiculo/index" options={{ title: "Veículos" }} />
    <Stack.Screen name="veiculo/form" options={{ title: "Cadastrar veículo" }} />
    <Stack.Screen name="veiculo/edit" options={{ title: "Editar veículo" }} />
  </Stack>;
}
