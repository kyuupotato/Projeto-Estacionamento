import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../components/AppButton";
import { styles } from "../constants/styles";

export default function Home() {
  const router = useRouter();
  return <View style={[styles.container, { justifyContent: "center", padding: 24, gap: 16 }]}>
    <Text style={styles.title}>ESTACIONAMENTO</Text>
    <Text style={[styles.muted, { fontSize: 16, lineHeight: 23 }]}>Gerencie proprietários e veículos em um só lugar.</Text>
    <AppButton title="PROPRIETÁRIOS" onPress={() => router.push("/proprietario")} />
    <AppButton title="VEÍCULOS" onPress={() => router.push("/veiculo")} />
  </View>;
}
