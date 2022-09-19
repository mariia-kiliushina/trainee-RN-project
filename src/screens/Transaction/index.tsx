import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Layout} from 'components/Layout';

export const Transaction = () => {
  return (
    <View style={styles.main}>
      <Layout>
        <Typography variant="18">Transaction</Typography>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.blue100,
    paddingHorizontal: 20,
  },
});
