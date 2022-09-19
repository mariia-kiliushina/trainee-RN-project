import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Container} from 'src/components/Container';

export const Budget = () => {
  return (
    <Container style={styles.main}>
      <Typography variant="18">Budget</Typography>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
  },
});
