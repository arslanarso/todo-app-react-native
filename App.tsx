import Navigation from "@/navigation";
import theme from "@/utils/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * The root component of the React Native application.
 */
export default function App() {
  return (
    // Gesture Handler Root View for handling gestures
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      {/* ThemeProvider for providing the theme to components */}
      <ThemeProvider theme={theme}>
        {/* SafeAreaProvider for handling safe area insets */}
        <SafeAreaProvider>
          {/* BottomSheetModalProvider for providing bottom sheet functionality */}
          <BottomSheetModalProvider>
            {/* NavigationContainer for managing the navigation state */}
            <NavigationContainer>
              {/* Navigation component to define the app's navigation structure */}
              <Navigation />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
