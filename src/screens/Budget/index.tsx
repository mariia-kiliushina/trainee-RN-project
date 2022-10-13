import React from 'react';
import {StyleSheet} from 'react-native';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';

export const Budget = () => {
  return (
    <Container style={styles.main}>
      <Typography>Budget</Typography>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
