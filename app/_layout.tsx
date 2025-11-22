import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>

      {/* Revenues */}
      <Stack.Screen 
        name="revenues"
        options={{
          gestureEnabled: false,
          animation: "simple_push"
        }}
      />

      {/* newRevenues */}
      <Stack.Screen 
        name="newRevenues"
        options={{
          gestureEnabled: false,
          animation: "simple_push"
        }}
      />
    </Stack>
  );
}
