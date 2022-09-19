import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from 'constants/colors';
import {Container} from 'src/components/Container';
import {Slider} from 'components/Slider';

export const Budget = () => {
  return (
    <Container style={styles.main}>
      <Slider style={styles.customizedHorizontalSlider} />
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
  },
  customizedHorizontalSlider: {
    paddingTop: 30,
  },
});
