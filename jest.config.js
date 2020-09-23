module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>/src"],
  testRegex: "(/tests/.*.(test|spec)).js?$",
  moduleFileExtensions: ["js"],
  moduleNameMapper: {
    "^@apps/(.*)$": "<rootDir>/apps/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
  },
};
