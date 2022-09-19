import React, {ReactNode} from 'react';
import {
  Text,
  TextProps,
  StyleProp,
  TextStyle,
  StyleSheet,
  ColorValue,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from 'constants/colors';
import {capitalizeFirstLetter} from 'utils/formatters';

type TFontVariant = '14' | '18';
type FontType = 'regular' | 'bold';

const fontVariants: {[k in TFontVariant]: StyleProp<TextStyle>} =
  StyleSheet.create({
    14: {
      fontSize: 14,
      lineHeight: 18,
    },
    18: {
      fontSize: 18,
      lineHeight: 22,
    },
  });

type Props = TextProps & {
  children: ReactNode;
  variant?: TFontVariant;
  color?: ColorValue;
  fontType?: FontType;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export const Typography = ({
  children,
  variant = '14',
  color = COLORS.baseDark50,
  fontType = 'regular',
  textStyle,
  style,
  ...restProps
}: Props) => {
  const fontFamily = `Inter-${capitalizeFirstLetter(fontType)}`;

  const fontVariant = fontVariants[variant];

  return (
    <View style={style}>
      <Text
        style={[fontVariant, {fontFamily, color}, textStyle]}
        {...restProps}>
        {children}
      </Text>
    </View>
  );
};
