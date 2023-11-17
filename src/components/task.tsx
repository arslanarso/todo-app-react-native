import { Box, Text, Theme } from "@/utils/theme";
import { useTheme } from "@shopify/restyle";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useGlobalStore from "@/store";
import { useNavigation } from "@react-navigation/native";

/**
 * Props for the Task component.
 */
type TaskProps = {
  task: ITask;
};

/**
 * Component representing a task item.
 * @param {TaskProps} props - The props for the Task component.
 * @returns {JSX.Element} - JSX element representing a task.
 */
const Task = ({ task }: TaskProps) => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();
  const { toggleTaskStatus } = useGlobalStore();

  return (
    <Pressable
      onPress={() => {
        toggleTaskStatus(task);
      }}
      onLongPress={() => {
        navigation.navigate("EditTask", {
          task,
        });
      }}
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        flex: 1,
        marginHorizontal: 8,
        marginVertical: 4,
      }}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="4"
      >
        <View>
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            {/* Task completion status icon */}
            <FontAwesome
              name="square"
              size={24}
              color={
                task.completed ? theme.colors.green500 : theme.colors.gray200
              }
            />
            {/* Task name */}
            <Text variant="textXl" ml="4">
              {task.name}
            </Text>
          </Box>
        </View>
      </Box>
    </Pressable>
  );
};

export default Task;

const styles = StyleSheet.create({});
