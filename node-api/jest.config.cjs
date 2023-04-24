module.exports = {
  preset: 'ts-jest',
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFiles: ["./tests/setup.js"],
};
