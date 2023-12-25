const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  coverageThreshold: {
    global: {
      branches: 83.33,
      functions: 93.1,
      lines: 97,
      statements: 97.17
    }
  }
}

module.exports = createJestConfig(customJestConfig)
