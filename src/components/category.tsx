import useGlobalStore from "@/store";
import { Box, Text } from "@/utils/theme";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { RefObject } from "react";
import { Pressable, StyleSheet } from "react-native";

/**
 * Props for the Category component.
 */
type CategoryProps = {
  category: ICategory;
  index: number;
  bottomSheetRef: RefObject<BottomSheetModal>;
};

/**
 * Component representing a category item.
 * @param {CategoryProps} props - The props for the Category component.
 * @returns {JSX.Element} - JSX element representing a category.
 */
const Category = ({ bottomSheetRef, category }: CategoryProps) => {
  const { updateSelectedCategory, selectedCategory } = useGlobalStore();

  /**
   * Handles the selection of a category.
   * Updates the selected category and closes the bottom sheet.
   * @param {ICategory} category - The selected category.
   */
  const onUpdateSelectedCategory = (category: ICategory) => {
    updateSelectedCategory(category);
    bottomSheetRef.current?.close();
  };

  return (
    <Pressable onPress={() => onUpdateSelectedCategory(category)}>
      <Box
        p="4"
        mt="1"
        bg={selectedCategory?.id === category.id ? "blue200" : "gray100"}
        key={category.id}
        borderRadius="roundedXl"
        flexDirection="row"
        alignItems="center"
      >
        {/* Category selection status icon */}
        <FontAwesome name="square-o" size={24} color={category.color.code} />
        {/* Category name */}
        <Text variant="textXl" ml="4">
          {category.name}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Category;
