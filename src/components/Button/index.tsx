import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Typography} from '../Typography';
import {COLORS} from '../../constants/colors';
import {Add, Cross, Pen} from '../../assets/svg';

type TButtonType = 'primary' | 'secondary' | 'link';

const icons = {
  add: Add,
  pen: Pen,
  cross: Cross,
};

type IconTypes = keyof typeof icons;

type Props = PressableProps & {
  type: TButtonType;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  iconName?: IconTypes;
  iconHeight?: number;
  iconWidth?: number;
  onPress: () => void;
};

export const Button = ({
  children,
  type,
  style,
  iconName,
  iconHeight = 22,
  iconWidth = 22,
  onPress,
  ...restProps
}: Props) => {
  const styleButton = styles[type];

  const Icon = iconName ? icons[iconName] : null;

  let textColor = '';

  switch (type) {
    case 'primary':
      textColor = COLORS.baseLight80;
      break;
    case 'secondary':
      textColor = COLORS.violet100;
      break;
    default:
      textColor = COLORS.baseDark50;
      break;
  }

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        styleButton,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      {...restProps}>
      {Icon && (
        <Icon
          color={textColor}
          height={iconHeight}
          width={iconWidth}
          style={styles.icon}
        />
      )}
      <Typography color={textColor} variant="18">
        {children}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  primary: {
    paddingVertical: 17,
    backgroundColor: COLORS.violet100,
  },
  secondary: {
    paddingVertical: 17,
    backgroundColor: COLORS.violet20,
  },
  link: {
    paddingVertical: 7,
    borderWidth: 1,
    alignSelf: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 15,
  },
});
