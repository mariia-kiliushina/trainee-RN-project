module.exports = {
  root: true,
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
  },
  plugins: ['react-hooks', 'react-native'],

  extends: '@react-native-community',
};
