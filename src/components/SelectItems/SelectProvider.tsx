import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, View} from 'react-native';
import {Bank} from 'src/assets/svg';
import {COLORS} from 'src/constants/colors';
import {Typography} from 'src/components/Typography';
import {SelectItemProps} from './types';

export const SelectProvider = ({value, onPress}: SelectItemProps) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
        onPress(value);
      }}
      style={({pressed}) => [pressed && styles.pressed]}
    >
      <View style={styles.wrapper}>
        <Bank height={36} width={36} style={styles.icon} />
        <Typography color={COLORS.neutral900} textStyle={styles.text}>
          {value.provider}
        </Typography>
        <Typography textStyle={styles.text} color={COLORS.neutral400}>
          {value.currency}
        </Typography>
        <Typography textStyle={styles.text} color={COLORS.neutral400}>
          {value.amount}
        </Typography>
      </View>
      <View style={[styles.bottomLine]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 16,
  },
  wrapper: {
    padding: 16,
    paddingLeft: 44,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: COLORS.neutral200,
  },
  text: {
    marginBottom: 4,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
