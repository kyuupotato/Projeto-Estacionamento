import { StyleSheet } from "react-native";

export const colors = {
  primary: "#1D75CD", background: "#F4F8FB", text: "#111827",
  muted: "#4B5563", border: "#D1D5DB", danger: "#DC2626",
  white: "#FFFFFF", orange: "#F97316"
};

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, gap: 12 },
  title: { fontSize: 25, fontWeight: "800", color: colors.text, marginBottom: 8 },
  label: { fontSize: 15, fontWeight: "700", color: colors.text, marginTop: 7 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, fontSize: 16 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 15, marginBottom: 12, gap: 5, elevation: 2 },
  button: { backgroundColor: colors.primary, borderRadius: 10, padding: 14, alignItems: "center", marginTop: 5 },
  dangerButton: { backgroundColor: colors.danger, borderRadius: 10, padding: 11, alignItems: "center", flex: 1 },
  secondaryButton: { backgroundColor: colors.orange, borderRadius: 10, padding: 11, alignItems: "center", flex: 1 },
  buttonText: { color: colors.white, fontWeight: "700" },
  row: { flexDirection: "row", gap: 9, marginTop: 8 },
  muted: { color: colors.muted },
  picker: { backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderRadius: 10, overflow: "hidden" }
});
