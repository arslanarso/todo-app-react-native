import useGlobalStore from "@/store";
import { Box, Text } from "@/utils/theme";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { nanoid } from "nanoid/non-secure";
import React, { useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";

/**
 * Component for creating a new task.
 */
const CreateTask = () => {
  const { categories, selectedCategory, addTask } = useGlobalStore();
  const navigation = useNavigation();

  const [newTask, setNewTask] = useState<ITask>({
    id: `task_${nanoid()}`,
    name: "",
    categoryId: selectedCategory?.id ?? "",
    completed: false,
  });

  /**
   * Handles the creation of a new task by adding it to the global store and navigating back to the home screen.
   */
  const handleCreateTask = () => {
    addTask(newTask);
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
      <View style={{ padding: 10, position: "absolute", width: "100%" }}>
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            width={"100%"}
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Input for task name */}
            <Box
              width={"100%"}
              bg="white"
              borderRadius="roundedXl"
              alignItems="center"
              justifyContent="center"
              p="4"
            >
              <TextInput
                style={{
                  fontSize: 20,
                  width: "100%",
                }}
                placeholder="Create new task"
                value={newTask.name}
                onChangeText={(text) => {
                  setNewTask((prev) => {
                    return {
                      ...prev,
                      name: text,
                    };
                  });
                }}
              />
            </Box>
            <Box height={20} />

            {/* Picker for selecting a category */}
            <Box width={"100%"}>
              <Picker
                style={{
                  backgroundColor: "white",
                  borderRadius: 16,
                }}
                selectedValue={newTask.categoryId}
                onValueChange={(itemValue) => {
                  const currentCategory = categories.find(
                    (categoryItem) => categoryItem.id === itemValue
                  );
                  if (currentCategory) {
                    setNewTask((task) => {
                      return {
                        ...task,
                        categoryId: currentCategory.id,
                      };
                    });
                  }
                }}
              >
                {categories.map((category) => (
                  <Picker.Item
                    style={{
                      backgroundColor: "white",
                      borderRadius: 16,
                    }}
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </Picker>
            </Box>
          </Box>
        </Box>

        <Box height={20} />

        {/* Button to create the task */}
        <Pressable onPress={handleCreateTask}>
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
      </View>
    </View>
  );
};

export default CreateTask;
