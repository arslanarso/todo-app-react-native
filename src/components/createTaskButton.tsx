import { Theme } from "@/utils/theme";
import React from "react";
import { Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";

/**
 * Component representing a button to navigate to the "CreateTask" screen.
 */
const CreateTaskButton = () => {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();

  /**
   * Navigates to the "CreateTask" screen when the button is pressed.
   */
  const navigateToCreateTask = () => {
    navigation.navigate("CreateTask");
  };

  return (
    <View
      style={{
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.rose500,
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: "grey",
      }}
    >
      <Pressable onPress={navigateToCreateTask}>
        <MaterialCommunityIcons
          name="plus"
          size={40}
          color={theme.colors.white}
        />
      </Pressable>
    </View>
  );
};

export default CreateTaskButton;
