import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TapLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#25292e" },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "green",
        tabBarStyle: { backgroundColor: "#25292e" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "bag-handle" : "bag-handle-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
