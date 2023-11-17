import task from "@/components/task";
import { RootStackParamList } from "@/navigation/types";
import useGlobalStore from "@/store";
import { Box, Text } from "@/utils/theme";
import { Picker } from "@react-native-picker/picker";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { nanoid } from "nanoid/non-secure";
import React, { useState } from "react";
import { Pressable, TextInput, View, Image } from "react-native";

type EditTaskRoute = RouteProp<RootStackParamList, "EditTask">;

/**
 * Component for editing an existing task.
 */
const EditTask = () => {
  const { categories, updateTasks, tasks } = useGlobalStore();
  const navigation = useNavigation();

  const { params } = useRoute<EditTaskRoute>();

  // State to manage the edited task
  const [newTask, setNewTask] = useState<ITask>(params.task);

  /**
   * Handles the update of the edited task, saves changes, and navigates back to the home screen.
   */
  const handleCreateTask = () => {
    const updatedTasks = tasks.map((taskItem) => {
      if (taskItem.id === newTask.id) {
        return {
          ...newTask,
        };
      } else {
        return taskItem;
      }
    });

    updateTasks(updatedTasks);
    navigation.navigate("Home");
  };

  /**
   * Handles the deletion of the edited task, removes it from the tasks list, and navigates back to the home screen.
   */
  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((taskItem) => taskItem.id !== newTask.id);
    updateTasks(updatedTasks);
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
                placeholder="Enter the Task name"
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

          {/* Edit Task Button */}
          <Box
            mx="4"
            bg="blue500"
            width={"100%"}
            borderRadius="rounded2Xl"
            p="2"
            alignItems="center"
            style={{
              marginTop: "5%",
            }}
          >
            <Pressable
              style={{ width: "100%", alignItems: "center" }}
              onPress={handleCreateTask}
            >
              <Text variant="textXl" color="white">
                Edit
              </Text>
            </Pressable>
          </Box>

          {/* Delete Task Button */}
          <Box
            mx="4"
            bg="red500"
            width={"100%"}
            borderRadius="rounded2Xl"
            p="2"
            alignItems="center"
            style={{
              marginTop: 10,
            }}
          >
            <Pressable
              style={{ width: "100%", alignItems: "center" }}
              onPress={handleDeleteTask}
            >
              <Text variant="textXl" color="white">
                Delete
              </Text>
            </Pressable>
          </Box>
        </Box>
      </View>
    </View>
  );
};

export default EditTask;
