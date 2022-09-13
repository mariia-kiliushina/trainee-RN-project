import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from './src/components/Typography';

const App = () => {
  return (
    <View style={styles.main}>
      <Typography fontType="regular"> Hello world</Typography>
      <Typography fontType="bold"> Hello world</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
export default App;
