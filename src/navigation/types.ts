import { NativeStackScreenProps } from "@react-navigation/native-stack";

/**
 * Type definition for the parameters of each screen in the root stack.
 */
export type RootStackParamList = {
  Home: undefined;
  CreateTask: undefined;
  EditTask: {
    task: ITask;
  };
  CreateCategory: undefined;
  EditCategory: {
    category: undefined;
  };
};

/**
 * Type definition for the screen props in the root stack.
 * @template T - Union of keys from RootStackParamList.
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

/**
 * Extends the ReactNavigation namespace to include the RootParamList,
 * ensuring that the types are available globally within the React Navigation library.
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
