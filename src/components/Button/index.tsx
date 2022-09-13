import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Typography from '../Typography';
import Cross from '../../../assets/svg/cross.svg';
import COLORS from '../../COLORS';

type ButtonType = 'primary' | 'secondary' | 'link';
type ButtonSize = 'large' | 'small' | 'pills';
type SvgTypes = 'cross';

type Props = {
  type: ButtonType;
  children: string;
  svg?: SvgTypes;
  size: ButtonSize;
  onPress: () => void;
};

const textColorMap = {
  primary: COLORS.baseLight80,
  secondary: COLORS.violet100,
  link: COLORS.baseDark50,
};

const textFontSizeMap = {
  large: 18,
  small: 18,
  pills: 14,
};

const buttonColorMap = {
  primary: COLORS.violet100,
  secondary: COLORS.violet20,
  link: 'transparent',
};

const Button = ({children, onPress, size, svg, type, ...restProps}: Props) => {
  const textColor = textColorMap[type];
  const textFontSize = textFontSizeMap[size];
  const buttonColor = buttonColorMap[type];
  //@ts-ignore
  //TODO: find appropriate type for pressed
  const getButtonColor = pressed => {
    if (pressed && buttonColor === COLORS.violet20) {
      return COLORS.violet100;
    } else if (pressed && buttonColor !== COLORS.violet20) {
      return COLORS.violet20;
    }
    return buttonColor;
  };
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        styles[size],
        {
          backgroundColor: getButtonColor(pressed),
        },
      ]}
      onPress={onPress}
      {...restProps}>
      {svg && <Cross width={22} height={22} style={{marginRight: 15}} />}
      <Typography style={{fontSize: textFontSize, color: textColor}}>
        {children}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    height: 56,
    width: '100%',
    padding: 8,
  },
  small: {
    height: 56,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '50%',
  },
  pills: {
    height: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '20%',
    borderRadius: 40,
  },
});

export default Button;
