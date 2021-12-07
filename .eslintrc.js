module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  overrides: [
    {
      files: ['specs/**/*.js'],
      env: {
        mocha: true
      }
    }
  ],
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
  }
}
