/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // moduleFileExtensions: ['js', 'ts']
  moduleNameMapper: {
    "^(.*)/src/(.*)\\.js$": "<rootDir>/src/$2.ts",
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
