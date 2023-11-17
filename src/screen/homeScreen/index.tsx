import useGlobalStore from "@/store";
import { Text, Theme } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useRef } from "react";
import { FlatList, Pressable, StyleSheet, View, Image } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Category from "@/components/category";
import CreateTaskButton from "@/components/createTaskButton";
import Tasks from "@/components/tasks";

/**
 * The main screen component for the application, displaying categories, tasks, and a bottom sheet for filtering.
 */
const Home = () => {
  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const theme = useTheme<Theme>();

  const snapPoints = useMemo(() => ["60%"], []);

  const { categories, selectedCategory } = useGlobalStore();

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Category icon */}
          <FontAwesome
            name="square-o"
            size={24}
            color={selectedCategory?.color.code}
          />
          {/* Selected category name */}
          <Text variant="text2Xl" ml="3">
            {selectedCategory?.name}
          </Text>
        </View>

        {/* Filter button */}
        <Pressable
          onPress={() => {
            bottomSheetRef.current?.present();
          }}
        >
          <Ionicons size={32} name="filter-outline" />
        </Pressable>
      </View>
      {/* Tasks component */}
      {categories.length > 0 ? (
        <View style={styles.reversed}>
          <Tasks />
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 300, width: 300 }}
            source={require("../../assets/images/emptyData.png")}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
              marginHorizontal: 10,
            }}
          >
            There isn't any Task or Category. First of all you have to create a
            Category by pressing Categories button.
          </Text>
        </View>
      )}
      {/* Category Filter Bottom Sheet */}
      <BottomSheetModal ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              <Category
                key={item.id}
                index={index}
                category={item}
                bottomSheetRef={bottomSheetRef}
              />
            )}
          />

          {/* Create Category Button */}
          <View style={styles.reversed}>
            <Pressable
              style={{
                margin: 15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.rose500,
                width: 64,
                height: 64,
                borderRadius: 32,
              }}
              onPress={() => {
                bottomSheetRef.current?.close();
                navigation.navigate("CreateCategory");
              }}
            >
              <MaterialCommunityIcons
                name="plus"
                size={40}
                color={theme.colors.white}
              />
            </Pressable>
          </View>
        </View>
      </BottomSheetModal>
      {/* Create Task Button */}
      {categories.length > 0 ? (
        <View style={styles.reversed}>
          <CreateTaskButton />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  reversed: {
    flexDirection: "row-reverse",
  },
});
