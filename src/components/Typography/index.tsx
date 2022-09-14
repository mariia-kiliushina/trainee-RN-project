import React, {ReactNode} from 'react';
import {
  View,
  Text,
  TextProps,
  StyleProp,
  TextStyle,
  StyleSheet,
  ColorValue,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {capitalizeFirstLetter} from '../../utils/formatters';

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
  variant: keyof typeof fontVariants;
  color?: ColorValue;
  fontType?: FontType;
  style?: StyleProp<TextStyle>;
};

const Typography = ({
  children,
  variant,
  color = COLORS.baseDark50,
  fontType = 'regular',
  style,
  ...restProps
}: Props) => {
  const fontFamily = `Inter-${capitalizeFirstLetter(fontType)}`;
  const fontVariant = fontVariants[variant];

  return (
    <View>
      <Text style={[fontVariant, {fontFamily, color}, style]} {...restProps}>
        {children}
      </Text>
    </View>
  );
};

export default Typography;
