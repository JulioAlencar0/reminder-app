import { Stack } from "expo-router";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}
