import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, headerLeft: () => <></> }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar barStyle="default" />
    </GestureHandlerRootView>
  );
}
