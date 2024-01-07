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
      branches: 89.36,
      functions: 94.05,
      lines: 97.12,
      statements: 97.04
    }
  }
}

module.exports = createJestConfig(customJestConfig)
