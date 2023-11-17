import { renderHook, act } from "@testing-library/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGlobalStore from "@/store";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("useGlobalStore", () => {
  beforeEach(() => {
    // Clear mock implementations before each test
    AsyncStorage.setItem.mockClear();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.removeItem.mockClear();
  });

  it("should initialize with empty categories, tasks, and null selectedCategory", () => {
    const { result } = renderHook(() => useGlobalStore());
    expect(result.current.categories).toEqual([]);
    expect(result.current.tasks).toEqual([]);
    expect(result.current.selectedCategory).toBeNull();
  });

  it("should add a task to the store", () => {
    const { result } = renderHook(() => useGlobalStore());

    const task = {
      id: "1",
      categoryId: "1",
      name: "Test Task",
      completed: false,
    };

    act(() => {
      result.current.addTask(task);
    });

    expect(result.current.tasks).toEqual([task]);
  });

  it("should update tasks in the store", () => {
    const { result } = renderHook(() => useGlobalStore());

    const updatedTasks = [
      { id: "1", categoryId: "1", name: "Updated Task 1", completed: true },
      { id: "2", categoryId: "1", name: "Updated Task 2", completed: false },
    ];

    act(() => {
      result.current.updateTasks(updatedTasks);
    });

    expect(result.current.tasks).toEqual(updatedTasks);
  });

  it("should update selected category in the store", () => {
    const { result } = renderHook(() => useGlobalStore());

    const category = {
      id: "1",
      name: "Test Category",
      color: { id: "1", name: "Red", code: "#FF0000" },
    };

    act(() => {
      result.current.updateSelectedCategory(category);
    });

    expect(result.current.selectedCategory).toEqual(category);
  });

  it("should add a category to the store", () => {
    const { result } = renderHook(() => useGlobalStore());

    const category = {
      id: "1",
      name: "Test Category",
      color: { id: "1", name: "Red", code: "#FF0000" },
    };

    act(() => {
      result.current.addCategory(category);
    });

    expect(result.current.categories).toEqual([category]);
  });
});
