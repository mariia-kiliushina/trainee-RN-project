import React from 'react';
import {StyleSheet, View} from 'react-native';
import Home from './src/components/Home';

const App = () => {
  return (
    <View style={styles.main}>
      <Home />
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
