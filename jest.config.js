module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>/src"],
  testRegex: "(/tests/.*.(test|spec)).js?$",
  moduleFileExtensions: ["js"],
  moduleNameMapper: {
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
  },
};
