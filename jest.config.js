module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/react-hooks"],
  moduleNameMapper: {
    "^@react-native-async-storage/async-storage$":
      "<rootDir>/__mocks__/AsyncStorage.js",
  },
};
