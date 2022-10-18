import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Container} from 'src/components/Container';
// import {Input} from 'src/components/Input';

export const Budget = () => {
  return (
    <Container style={styles.main}>
      <View style={styles.shadow}>
        <View style={styles.base} />
        {/* <Input label="Test" /> */}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 0,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 6,
        shadowColor: 'red',
        borderWidth: 3,
        borderColor: 'transparent',
        borderRadius: 6,
      },
    }),
  },
  base: {
    backgroundColor: 'white',
    height: 40,
  },
});
