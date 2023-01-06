import {StyleSheet, View} from 'react-native';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';

type TProps = {
  time: number;
};

export const TimeCounter = ({time}: TProps) => {
  return (
    <View style={styles.wrapper}>
      <Typography
        variant="16"
        style={styles.style}
        textStyle={styles.textStyle}
      >
        {`${time}s`}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.warning300,
    borderRadius: 6,
    width: 70,
    paddingHorizontal: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
  wrapper: {
    alignItems: 'center',
  },
});
