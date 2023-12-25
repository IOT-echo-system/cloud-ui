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
      branches: 90.9,
      functions: 96.36,
      lines: 97.77,
      statements: 97.79
    }
  }
}

module.exports = createJestConfig(customJestConfig)
