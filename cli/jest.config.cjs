module.exports = {
  transform: {},
  rootDir: "./",
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "#(.*)": "<rootDir>/node_modules/$1",
  },
};
