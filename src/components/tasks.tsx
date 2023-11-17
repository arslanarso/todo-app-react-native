import useGlobalStore from "@/store";
import { Box } from "@/utils/theme";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Task from "./task";

/**
 * Component to display a list of tasks based on the selected category.
 * @returns JSX element representing the list of tasks.
 */
const Tasks = () => {
  const { tasks, selectedCategory } = useGlobalStore();

  // Return null if no category is selected
  if (!selectedCategory) {
    return null;
  }

  // Filter tasks based on the selected category
  const tasksInCurrentCategory = tasks.filter(
    (task) => task.categoryId === selectedCategory.id
  );

  /**
   * Empty view to be displayed when there are no tasks in the selected category.
   * @returns JSX element representing the empty view.
   */
  const EmptyView = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ height: 300, width: 300 }}
          source={require("../assets/images/emptyData.png")}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "500",
            marginHorizontal: 10,
          }}
        >
          There isn't any Task. You can create by pressing Add button.
        </Text>
      </View>
    );
  };

  return (
    <Box flex={1}>
      <FlatList
        data={tasksInCurrentCategory}
        ListEmptyComponent={EmptyView}
        renderItem={({ item }) => <Task task={item} />}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </Box>
  );
};

export default Tasks;

const styles = StyleSheet.create({});
