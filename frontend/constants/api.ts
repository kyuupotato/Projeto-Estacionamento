import { Platform } from "react-native";

// Android Emulator: use 10.0.2.2 to access the computer running the API.
// iOS simulator: localhost usually works.
// Physical phone: replace with your computer's LAN IPv4 address (example: 192.168.0.15).
export const API_BASE_URL = Platform.OS === "android"
  ? "http://10.0.2.2:8081"
  : "http://localhost:8081";
