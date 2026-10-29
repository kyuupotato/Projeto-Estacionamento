import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../constants/styles";

type Props = { title: string; onPress: () => void; variant?: "primary" | "danger" | "secondary" };
export default function AppButton({ title, onPress, variant = "primary" }: Props) {
  const backgroundColor = variant === "danger" ? colors.danger : variant === "secondary" ? colors.orange : colors.primary;
  return <Pressable onPress={onPress} style={[styles.button, { backgroundColor }]}><Text style={styles.text}>{title}</Text></Pressable>;
}
const styles = StyleSheet.create({
  button: { borderRadius: 10, padding: 14, alignItems: "center", justifyContent: "center" },
  text: { color: "#fff", fontWeight: "700" }
});
