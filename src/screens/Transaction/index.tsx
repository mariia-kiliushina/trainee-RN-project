import React from 'react';
import {StyleSheet} from 'react-native';
import {Typography} from 'src/components/Typography';
import {Container} from 'src/components/Container';

export const Transaction = () => {
  return (
    <Container style={styles.main}>
      <Typography variant="18">Transaction</Typography>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
