import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Container} from 'src/components/Container';

export const Budget = () => {
  return (
    <Container style={styles.main}>
      <View>Budget</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
    paddingHorizontal: 0,
  },
});
