import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';
import {SelectItemProps} from './types';
import {Camera, Upload, IconsType} from 'src/assets/svg';

const icons: IconsType = {
  Upload,
  Camera,
};

export const SelectAddPhotoOption = ({value, onPress}: SelectItemProps) => {
  const Icon = value.iconName ? icons[value.iconName] : null;

  return (
    <Pressable
      onPress={() => {
        onPress(value);
      }}
      style={({pressed}) => [pressed && styles.pressed]}
    >
      <View style={styles.wrapper}>
        {Icon && <Icon height={25} width={25} color={COLORS.neutral300} />}
        <Typography color={COLORS.neutral900} textStyle={styles.text}>
          {value.name}
        </Typography>
      </View>
      <View style={[styles.bottomLine]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: COLORS.neutral200,
  },
  text: {
    lineHeight: 20,
    marginLeft: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
