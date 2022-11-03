import {ReactNode} from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import {Typography} from 'components/Typography';
import {COLORS} from 'constants/colors';

type TButtonType = 'primary' | 'secondary';

type Props = PressableProps & {
  type: TButtonType;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  iconHeight?: number;
  iconWidth?: number;
  onPress?: (event: GestureResponderEvent) => void;
  hitSlop?:
    | number
    | {
        bottom: number;
        left: number;
        right: number;
        top: number;
      };
};

export const Button = ({
  children,
  type,
  style,
  onPress,
  hitSlop,
  ...restProps
}: Props) => {
  const styleButton = styles[type];

  const textColorVariants = {
    primary: COLORS.genericWhite,
    secondary: COLORS.warning500,
  };

  const textColor = textColorVariants[type];

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        styleButton,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      hitSlop={hitSlop}
      {...restProps}
    >
      <Typography color={textColor} variant="14">
        {children}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingHorizontal: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  /*eslint-disable react-native/no-unused-styles */
  primary: {
    paddingVertical: 12,
    backgroundColor: COLORS.warning500,
  },
  secondary: {
    paddingVertical: 12,
    backgroundColor: COLORS.genericWhite,
    borderWidth: 1,
    borderColor: COLORS.warning500,
  },

  pressed: {
    opacity: 0.7,
  },
  /*eslint-enable react-native/no-unused-styles */
});