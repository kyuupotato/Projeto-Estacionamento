import React from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";
import { styles } from "../constants/styles";

type Props = TextInputProps & { label: string };
export default function FormField({ label, ...props }: Props) {
  return <View style={{ gap: 6 }}><Text style={styles.label}>{label}</Text><TextInput {...props} style={[styles.input, props.style]} placeholderTextColor="#9CA3AF" /></View>;
}
