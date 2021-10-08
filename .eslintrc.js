module.exports = {
  extends: [
    'prettier',
    'next',
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'react/display-name': 'off',
  },
};
