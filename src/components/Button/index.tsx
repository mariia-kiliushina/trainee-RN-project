import React from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Typography from '../Typography';
import COLORS from '../../COLORS';
import Icon, {TIconTypes} from '../Icon';

type TButtonType = 'primary' | 'secondary' | 'link';

type Props = PressableProps & {
  type: TButtonType;
  children: string;
  style?: StyleProp<ViewStyle>;
  iconName?: TIconTypes;
  iconStyle?: StyleProp<ViewStyle>;
  iconHeight?: number;
  iconWidth?: number;
  onPress: () => void;
};

const Button = ({
  children,
  type,
  style,
  iconStyle,
  iconName,
  iconHeight = 22,
  iconWidth = 22,
  onPress,
  ...restProps
}: Props) => {
  const styleButton = styles[type];

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
      {iconName && (
        <Icon
          name={iconName}
          color={textColor}
          height={iconHeight}
          width={iconWidth}
          style={iconStyle}
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
});

export default Button;
