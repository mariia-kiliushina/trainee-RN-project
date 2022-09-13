import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {FC} from 'react';
import Typography from '../Typography';
// import Svg, {Rect} from 'react-native-svg';
import Cross from '../../../assets/svg/cross.svg';
import COLORS from '../../COLORS';

type ButtonType = 'primary' | 'secondary' | 'link';
type ButtonSize = 'large' | 'small' | 'pills';
type ImageTypes = 'cross';

type Props = {
  type: ButtonType;
  children: string;
  svg?: ImageTypes;
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

const Button: FC<Props> = ({
  children,
  onPress,
  size,
  svg,
  type,
  ...restProps
}) => {
  const textColor = textColorMap[type];
  const textFontSize = textFontSizeMap[size];
  const buttonColor = buttonColorMap[type];
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        styles[size],
        {
          backgroundColor: pressed ? COLORS.violet20 : buttonColor,
        },
      ]}
      onPress={onPress}
      {...restProps}>
      {svg && <Cross width={22} height={22} style={{marginRight: 15}} />}
      <Typography fontSize={textFontSize} color={textColor}>
        {children}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // primary: {
  //   backgroundColor: COLORS.violet100,
  // },
  // secondary: {
  //   backgroundColor: COLORS.violet20,
  // },
  // link: {
  //   backgroundColor: 'none',
  // },
  large: {
    height: 56,
    width: 343,
    padding: 8,
  },
  small: {
    height: 56,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 164,
  },
  pills: {
    height: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 78,
    borderRadius: 40,
  },
});

export default Button;
