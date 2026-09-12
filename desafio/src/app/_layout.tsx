import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AuditProvider } from "@/context/AudioContext";

export default function RootLayout() {
  return (
    <AuditProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="home"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="scanner"
          options={{
            title: "Escanear",
            tabBarIcon: ({ color, size }) => (
              <AntDesign
                name="camera"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="audio-log"
          options={{
            title: "Bitácora",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="history"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="map"
          options={{
            title: "Mapa",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="map"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </AuditProvider>
  );
}
