import React from 'react';
import {StyleSheet, View, Text, TextProps} from 'react-native';
import {FC} from 'react';
import {capitalizeFirstLetter} from '../../helpers';

type FontType = 'regular' | 'bold';

type Props = TextProps & {
  fontType?: FontType;
  children: string | number;
  color: string;
  fontSize?: number;
};

const Typography: FC<Props> = ({
  children,
  fontType = 'regular',
  ...restProps
}) => {
  const fontFamily = 'Inter-' + capitalizeFirstLetter(fontType);
  return (
    <View>
      <Text style={[styles.text, {fontFamily}, {...restProps}]}>
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
