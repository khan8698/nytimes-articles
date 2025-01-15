module.exports = {
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
};
