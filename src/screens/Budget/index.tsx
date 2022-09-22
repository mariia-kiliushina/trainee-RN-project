import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Container} from 'src/components/Container';
import {Slider} from 'components/Slider';
import {Button} from 'components/Button';

export const Budget = () => {
  return (
    <Container style={styles.main}>
      <Slider style={styles.customizedHorizontalSlider} />
      <View style={styles.content}>
        <Button type="primary">Click</Button>
        <Button type="secondary">Click</Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
    paddingHorizontal: 0,
  },
  customizedHorizontalSlider: {
    paddingTop: 30,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: '15%',
  },
});
