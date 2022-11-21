import {StyleSheet, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';

export const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <Typography fontType="bold" color={COLORS.genericWhite}>
        Loading...
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: COLORS.neutral900,
  },
});
