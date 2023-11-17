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
