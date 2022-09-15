module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          components: './src/components',
          constants: './src/constants',
          assets: './src/assets',
          utils: './src/utils',
        },
      },
    ],
  ],
};
