export default {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "<rootDir>/src/**/*.js",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/protocols",
    "<rootDir>/src/types",
  ],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-node",

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/src"
  ],
  // stop after first failing test
  bail: true
};
