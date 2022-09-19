import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Layout} from 'components/Layout';

export const Profile = () => {
  return (
    <View style={styles.main}>
      <Layout>
        <Typography variant="18">Profile</Typography>
      </Layout>
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
