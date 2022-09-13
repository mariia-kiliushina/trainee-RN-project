import React from 'react';
import {StyleSheet, View, Text, TextProps} from 'react-native';
import {FC} from 'react';
import {capitalizeFirstLetter} from '../../helpers';

type FontType = 'regular' | 'bold';

type Props = TextProps & {
  fontType: FontType;
  children: string;
};

const Typography: FC<Props> = ({
  children,
  fontType = 'regular',
  ...restProps
}) => {
  const fontFamily = 'Inter-' + capitalizeFirstLetter(fontType);

  return (
    <View>
      <Text style={[styles.text, {fontFamily: fontFamily}]} {...restProps}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 34,
  },
});

export default Typography;
