import useGlobalStore from "@/store";
import { getColors } from "@/utils/helpers";
import { Box, Text, Theme } from "@/utils/theme";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { nanoid } from "nanoid/non-secure";
import React, { useState } from "react";
import { Pressable, TextInput, View, Image } from "react-native";

// Get predefined colors for category selection
const COLORS = getColors();

/**
 * Component for creating a new category.
 */
const CreateCategory = () => {
  const navigation = useNavigation();

  // State to manage the new category
  const [newCategory, setNewCategory] = useState<ICategory>({
    name: "",
    id: `category_${nanoid()}`,
    color: {
      code: "",
      id: "",
      name: "",
    },
  });

  const { addCategory } = useGlobalStore();
  const theme = useTheme<Theme>();

  /**
   * Handles the creation of a new category, adds it to the global store, resets the input, and navigates back to the home screen.
   */
  const handleCreateCategory = () => {
    addCategory(newCategory);

    // Reset the input fields for a new category
    setNewCategory({
      name: "",
      id: `category_${nanoid()}`,
      color: {
        code: "",
        id: "",
        name: "",
      },
    });

    // Navigate back to the home screen
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: "100%",
        }}
      >
        <Image source={require("../../assets/images/whiteBg.jpg")} />
      </View>
      <View style={{ position: "absolute", width: "100%" }}>
        <Box
          flex={1}
          flexDirection="column"
          justifyContent="space-between"
          mx="3"
        >
          <Box flexDirection="column" width={"100%"}>
            {/* Input for category name */}
            <Box bg="white" borderRadius="rounded2Xl" mt="5">
              <TextInput
                placeholder="Create new Category"
                value={newCategory.name}
                onChangeText={(text) => {
                  setNewCategory((prev) => {
                    return {
                      ...prev,
                      name: text,
                    };
                  });
                }}
                style={{
                  padding: 16,
                  fontSize: 20,
                  width: "100%",
                }}
              />
            </Box>
            <Box height={20} />

            {/* Picker for selecting a color for the category */}
            <Picker
              selectedValue={newCategory.color.id}
              onValueChange={(itemValue, itemIndex) => {
                const currentColor = COLORS.find(
                  (color) => color.id === itemValue
                );
                if (currentColor) {
                  setNewCategory((prev) => {
                    return {
                      ...prev,
                      color: currentColor,
                    };
                  });
                }
              }}
              style={{
                backgroundColor: theme.colors.white,
                borderRadius: 16,
              }}
            >
              {COLORS.map((colorItem) => (
                <Picker.Item
                  style={{
                    borderWidth: 2,
                    borderRadius: 40,
                  }}
                  key={colorItem.id}
                  label={colorItem.name}
                  value={colorItem.id}
                />
              ))}
            </Picker>
          </Box>
          <Box height={20} />

          {/* Button to create the category */}
          <Pressable onPress={handleCreateCategory}>
            <Box
              bg="blue500"
              py="2"
              borderRadius="rounded2Xl"
              alignItems="center"
            >
              <Text color="white" variant="text2Xl">
                Create
              </Text>
            </Box>
          </Pressable>
        </Box>
      </View>
    </View>
  );
};

export default CreateCategory;
