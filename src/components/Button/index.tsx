import {ReactNode} from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Typography} from 'components/Typography';
import {COLORS} from 'constants/colors';

type TButtonType = 'primary' | 'secondary';

type Props = PressableProps & {
  type: TButtonType;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({
  children,
  type,
  style,
  onPress,
  hitSlop,
  disabled,
  ...restProps
}: Props) => {
  const buttonStyle = disabled ? styles[`${type}Disabled`] : styles[type];

  const textStyle = disabled
    ? styles[`${type}TextDisabled`]
    : styles[`${type}Text`];

  return (
    <Pressable
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        buttonStyle,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      hitSlop={hitSlop}
      {...restProps}
    >
      <Typography textStyle={textStyle} variant="14">
        {children}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 12,
    paddingHorizontal: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  /*eslint-disable react-native/no-unused-styles */
  primary: {
    backgroundColor: COLORS.warning500,
  },
  secondary: {
    backgroundColor: COLORS.genericWhite,
    borderWidth: 1,
    borderColor: COLORS.warning500,
  },

  pressed: {
    opacity: 0.7,
  },

  secondaryDisabled: {
    backgroundColor: COLORS.genericWhite,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
  },
  primaryDisabled: {
    backgroundColor: COLORS.neutral300,
  },

  primaryText: {
    color: COLORS.genericWhite,
  },
  secondaryText: {
    color: COLORS.warning500,
  },
  primaryTextDisabled: {
    color: COLORS.genericWhite,
  },
  secondaryTextDisabled: {
    color: COLORS.neutral300,
  },
  /*eslint-enable react-native/no-unused-styles */
});
