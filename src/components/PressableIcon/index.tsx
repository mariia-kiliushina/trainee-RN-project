import {ReactNode} from 'react';
import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  PressableProps,
} from 'react-native';

import {Cross, Record, Flip, Reset, Stop, Checkmark} from 'assets/svg';

const images = {
  Cross,
  Record,
  Flip,
  Reset,
  Checkmark,
  Stop,
};

export type IconName = keyof typeof images;

type Props = PressableProps & {
  onPress?: () => void;
  color?: string;
  iconName?: keyof typeof images;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const PressableIcon = ({
  onPress,
  children,
  style,
  iconName,
  color,
  ...restProps
}: Props) => {
  const Icon = iconName ? images[iconName] : undefined;

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        style,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      {...restProps}
    >
      {children && children}
      {Icon && <Icon color={color} width={40} height={40} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
