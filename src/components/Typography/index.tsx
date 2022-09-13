import React, {ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import {capitalizeFirstLetter} from '../../utils/helpers';

type FontType = 'regular' | 'bold';

type Props = TextProps & {
  fontType?: FontType;
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

const Typography = ({
  children,
  fontType = 'regular',
  style,
  ...restProps
}: Props) => {
  const fontFamily = `Inter-${capitalizeFirstLetter(fontType)}`;

  return (
    <View>
      <Text
        style={[styles.text, {fontFamily: fontFamily}, style]}
        {...restProps}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
  },
});

export default Typography;
