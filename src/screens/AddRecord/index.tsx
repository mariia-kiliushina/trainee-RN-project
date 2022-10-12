import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';

export const AddRecord = () => {
  return (
    <View style={styles.main}>
      <Typography>Add record</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
    paddingHorizontal: 20,
  },
});
