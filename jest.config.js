module.exports = {
  preset: 'ts-jest',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?@react-native|react-native|react-navigation|@react-navigation/.*|lodash-es|@sentry/.*))'
  ],
  setupFiles: ['<rootDir>/jest.setup.js', 'jest-date-mock'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/mocks/svg.mock.js'
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
