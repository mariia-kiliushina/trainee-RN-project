import React from 'react';
import {StyleSheet} from 'react-native';

import {Container} from 'src/components/Container';

import {COLORS} from 'src/constants/colors';
import {Form} from 'src/components/Form';

export const Home = () => {
  return (
    <Container style={styles.main}>
      <Form />
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.base000,
  },
});
