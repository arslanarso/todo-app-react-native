import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import CreateCategory from "@/screen/createCategoryScreen";
import CreateTask from "@/screen/createTaskScreen";
import EditTask from "@/screen/editTaskScreen";
import Home from "@/screen/homeScreen";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from Expo

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * React Navigation component managing the navigation stack.
 * @returns JSX element representing the navigation stack.
 */
const Navigation = () => {
  // Transparent gradient for header background
  const transparentGradient = {
    background: "transparent",
    colors: ["rgba(0,0,0,0.3)", "rgba(0,0,0,0)"], // Change these colors as needed
  };

  return (
    <Stack.Navigator>
      {/* Home screen */}
      <Stack.Screen name="Home" component={Home} />

      {/* CreateTask screen */}
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{
          headerTitle: "Create a Task",
          headerBackground: () => (
            <LinearGradient {...transparentGradient} style={{ flex: 1 }} />
          ),
        }}
      />

      {/* EditTask screen */}
      <Stack.Screen
        name="EditTask"
        component={EditTask}
        options={{
          headerTitle: "Edit Task",
          headerBackground: () => (
            <LinearGradient {...transparentGradient} style={{ flex: 1 }} />
          ),
        }}
      />

      {/* CreateCategory screen */}
      <Stack.Screen
        name="CreateCategory"
        component={CreateCategory}
        options={{
          headerTitle: "Create a Category",
          headerBackground: () => (
            <LinearGradient {...transparentGradient} style={{ flex: 1 }} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
