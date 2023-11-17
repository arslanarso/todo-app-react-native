import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Represents a color with a unique identifier, name, and hex code.
 */
interface IColor {
  id: string;
  name: string;
  code: string;
}

/**
 * Represents a category with a unique identifier, name, and associated color.
 */
interface ICategory {
  id: string;
  name: string;
  color: IColor;
}

/**
 * Represents a task with a unique identifier, associated category, name, and completion status.
 */
interface ITask {
  id: string;
  categoryId: string;
  name: string;
  completed: boolean;
}

/**
 * Represents the state and actions of the global store using Zustand.
 */
interface IGlobalStore {
  categories: ICategory[];
  tasks: ITask[];
  addTask: (task: ITask) => void;
  addCategory: (category: ICategory) => void;
  updateTasks: (tasks: ITask[]) => void;
  selectedCategory: null | ICategory;
  updateSelectedCategory: (category: ICategory) => void;
  toggleTaskStatus: (task: ITask) => void;
}

/**
 * Custom hook for creating a global store using Zustand with persistence.
 */
const useGlobalStore = create<IGlobalStore>()(
  persist(
    (set, get) => ({
      categories: [],
      tasks: [],
      selectedCategory: null,
      /**
       * Adds a new task to the store.
       * @param {ITask} task - The task to be added.
       */
      addTask: (task) => {
        const { tasks } = get();
        const updatedTasks = [...tasks, task];
        set({
          tasks: updatedTasks,
        });
      },
      /**
       * Updates the tasks in the store.
       * @param {ITask[]} updatedTasks - The updated array of tasks.
       */
      updateTasks: (updatedTasks) => {
        set({
          tasks: updatedTasks,
        });
      },
      /**
       * Updates the selected category in the store.
       * @param {ICategory} category - The category to be set as the selected category.
       */
      updateSelectedCategory: (category) => {
        set({
          selectedCategory: category,
        });
      },
      /**
       * Adds a new category to the store.
       * @param {ICategory} category - The category to be added.
       */
      addCategory: (category) => {
        const { categories } = get();
        const updatedCategories = [...categories, category];
        set({
          categories: updatedCategories,
        });
      },
      /**
       * Toggles the completion status of a task in the store.
       * @param {ITask} task - The task whose completion status will be toggled.
       */
      toggleTaskStatus: (task: ITask) => {
        const { tasks } = get();
        const updatedTasks = tasks.map((taskItem) => {
          if (taskItem.id === task.id) {
            return {
              ...task,
              completed: !task.completed,
            };
          } else {
            return taskItem;
          }
        });
        set({
          tasks: updatedTasks,
        });
      },
    }),
    {
      name: "todos-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useGlobalStore;
