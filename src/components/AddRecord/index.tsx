import React from 'react';
import {TopNavigation} from 'components/TopNavigation';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';

export const AddRecord = () => {
  return (
    <View style={styles.main}>
      <TopNavigation path="Main" iconName="arrow">
        AddRecord
      </TopNavigation>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.baseLight80,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
});
